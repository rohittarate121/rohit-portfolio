import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import {
  getAllEducation,
  createEducation,
  updateEducation,
} from "../../services/educationService.js";
import {
  findDisplayOrderConflict,
  findMissingRequiredFields,
} from "../../utils/displayOrderValidation.js";

const emptyEducation = {
  degree: "",
  institution: "",
  period: "",
  detail: "",
  displayOrder: 0,
};
const REQUIRED_FIELDS = ["degree", "institution", "period"];

export default function EducationEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyEducation);
  const [siblings, setSiblings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllEducation()
      .then((entries) => {
        setSiblings(entries);
        if (isEditMode) {
          const match = entries.find((e) => e.id === Number(id));
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
      (e) => e.degree,
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
        await updateEducation(id, payload);
      } else {
        await createEducation(payload);
      }
      navigate("/admin/dashboard/education");
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
        to="/admin/dashboard/education"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal mb-6"
      >
        <ArrowLeft size={15} /> Back to education
      </Link>

      <h1 className="font-display text-2xl font-semibold mb-6">
        {isEditMode ? "Edit Education" : "New Education"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Degree"
          value={form.degree}
          onChange={(v) => setField("degree", v)}
        />
        <Field
          label="Institution"
          value={form.institution}
          onChange={(v) => setField("institution", v)}
        />
        <Field
          label="Period"
          value={form.period}
          onChange={(v) => setField("period", v)}
          hint='e.g. "2026"'
        />
        <Field
          label="Detail"
          value={form.detail || ""}
          onChange={(v) => setField("detail", v)}
          hint='Optional, e.g. "CGPA: 6.75 / 10"'
        />
        <Field
          label="Display Order"
          type="number"
          value={form.displayOrder}
          onChange={(v) => setField("displayOrder", v)}
          hint="Must be unique across all education entries"
        />

        {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving
            ? "Saving…"
            : isEditMode
              ? "Save Changes"
              : "Create Education"}
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
