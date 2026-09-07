import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import {
  getAllExperiences,
  createExperience,
  updateExperience,
} from "../../services/experienceService.js";
import {
  findDisplayOrderConflict,
  findMissingRequiredFields,
} from "../../utils/displayOrderValidation.js";

const emptyExperience = {
  role: "",
  organization: "",
  duration: "",
  responsibilities: "",
  technologies: "",
  certificateUrl: "",
  displayOrder: 0,
};
const REQUIRED_FIELDS = ["role", "organization", "duration"];

function arrayToLines(arr) {
  return (arr || []).join("\n");
}
function linesToArray(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ExperienceEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyExperience);
  const [siblings, setSiblings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllExperiences()
      .then((experiences) => {
        setSiblings(experiences);
        if (isEditMode) {
          const match = experiences.find((e) => e.id === Number(id));
          if (match) {
            setForm({
              ...match,
              responsibilities: arrayToLines(match.responsibilities),
              technologies: arrayToLines(match.technologies),
            });
          }
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
    if (linesToArray(form.responsibilities).length === 0) {
      setError("Add at least one responsibility.");
      return;
    }

    const conflict = findDisplayOrderConflict(
      siblings,
      isEditMode ? Number(id) : null,
      form.displayOrder,
      (s) => `${s.role} at ${s.organization}`,
    );
    if (conflict) {
      setError(
        `Display Order ${form.displayOrder} is already used by "${conflict}" — choose a different number, or update that entry too.`,
      );
      return;
    }

    setIsSaving(true);
    const payload = {
      ...form,
      displayOrder: Number(form.displayOrder),
      responsibilities: linesToArray(form.responsibilities),
      technologies: linesToArray(form.technologies),
    };

    try {
      if (isEditMode) {
        await updateExperience(id, payload);
      } else {
        await createExperience(payload);
      }
      navigate("/admin/dashboard/experience");
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
    <div className="max-w-xl">
      <Link
        to="/admin/dashboard/experience"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal mb-6"
      >
        <ArrowLeft size={15} /> Back to experience
      </Link>

      <h1 className="font-display text-2xl font-semibold mb-6">
        {isEditMode ? "Edit Experience" : "New Experience"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="Role"
            value={form.role}
            onChange={(v) => setField("role", v)}
          />
          <Field
            label="Organization"
            value={form.organization}
            onChange={(v) => setField("organization", v)}
          />
        </div>
        <Field
          label="Duration"
          value={form.duration}
          onChange={(v) => setField("duration", v)}
          hint='Free text, e.g. "3 months"'
        />
        <Field
          label="Responsibilities"
          value={form.responsibilities}
          onChange={(v) => setField("responsibilities", v)}
          textarea
          rows={4}
          hint="One per line — at least one required"
        />
        <Field
          label="Technologies"
          value={form.technologies}
          onChange={(v) => setField("technologies", v)}
          textarea
          rows={3}
          hint="One per line — optional"
        />
        <Field
          label="Certificate URL"
          value={form.certificateUrl || ""}
          onChange={(v) => setField("certificateUrl", v)}
          hint="Optional"
        />
        <Field
          label="Display Order"
          type="number"
          value={form.displayOrder}
          onChange={(v) => setField("displayOrder", v)}
          hint="Must be unique across all experience entries"
        />

        {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving
            ? "Saving…"
            : isEditMode
              ? "Save Changes"
              : "Create Experience"}
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea,
  hint,
  rows = 3,
}) {
  return (
    <label className="block">
      <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink font-mono"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-void/15 dark:border-white/15 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
        />
      )}
      {hint && (
        <span className="block text-[11px] text-slate-dim dark:text-slate mt-1">
          {hint}
        </span>
      )}
    </label>
  );
}
