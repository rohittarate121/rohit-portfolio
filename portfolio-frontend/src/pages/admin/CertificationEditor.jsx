import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import {
  getAllCertifications,
  createCertification,
  updateCertification,
} from "../../services/certificationService.js";
import {
  findDisplayOrderConflict,
  findMissingRequiredFields,
} from "../../utils/displayOrderValidation.js";

const emptyCertification = {
  name: "",
  organization: "",
  date: "",
  credentialId: "",
  certificateUrl: "",
  verificationUrl: "",
  displayOrder: 0,
};
const REQUIRED_FIELDS = ["name", "organization", "date"];

export default function CertificationEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyCertification);
  const [siblings, setSiblings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllCertifications()
      .then((certs) => {
        setSiblings(certs);
        if (isEditMode) {
          const match = certs.find((c) => c.id === Number(id));
          if (match) setForm(match);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id, isEditMode]);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const missing = findMissingRequiredFields(form, REQUIRED_FIELDS);
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    const conflict = findDisplayOrderConflict(
      siblings,
      isEditMode ? Number(id) : null,
      form.displayOrder,
      (c) => c.name,
    );
    if (conflict) {
      setError(
        `Display Order ${form.displayOrder} is already used by "${conflict}" — choose a different number, or update that entry too.`,
      );
      return;
    }

    setIsSaving(true);
    try {
      const payload = { ...form, displayOrder: Number(form.displayOrder) };
      if (isEditMode) {
        await updateCertification(id, payload);
      } else {
        await createCertification(payload);
      }
      navigate("/admin/dashboard/certifications");
    } catch (err) {
      const fieldErrors = err.response?.data?.fieldErrors;
      setError(
        fieldErrors
          ? Object.entries(fieldErrors)
              .map(([field, msg]) => `${field}: ${msg}`)
              .join(" · ")
          : "Something went wrong — check the fields and try again.",
      );
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <p className="font-mono text-sm text-slate-dim dark:text-slate">
        Loading…
      </p>
    );
  }

  return (
    <div className="max-w-md">
      <Link
        to="/admin/dashboard/certifications"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal mb-6"
      >
        <ArrowLeft size={15} /> Back to certifications
      </Link>

      <h1 className="font-display text-2xl font-semibold mb-6">
        {isEditMode ? "Edit Certification" : "New Certification"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Name"
          value={form.name}
          onChange={(v) => setField("name", v)}
        />
        <Field
          label="Organization"
          value={form.organization}
          onChange={(v) => setField("organization", v)}
        />
        <Field
          label="Date"
          value={form.date}
          onChange={(v) => setField("date", v)}
          hint='Free text, e.g. "2026"'
        />
        <Field
          label="Credential ID"
          value={form.credentialId || ""}
          onChange={(v) => setField("credentialId", v)}
          hint="Optional"
        />
        <Field
          label="Certificate URL"
          value={form.certificateUrl || ""}
          onChange={(v) => setField("certificateUrl", v)}
          hint="Optional"
        />
        <Field
          label="Verification URL"
          value={form.verificationUrl || ""}
          onChange={(v) => setField("verificationUrl", v)}
          hint="Optional"
        />
        <Field
          label="Display Order"
          type="number"
          value={form.displayOrder}
          onChange={(v) => setField("displayOrder", v)}
          hint="Must be unique across all certifications"
        />

        {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving
            ? "Saving…"
            : isEditMode
              ? "Save Changes"
              : "Create Certification"}
        </Button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", hint }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
      />
      {hint && (
        <span className="block text-[11px] text-slate-dim dark:text-slate mt-1">
          {hint}
        </span>
      )}
    </label>
  );
}
