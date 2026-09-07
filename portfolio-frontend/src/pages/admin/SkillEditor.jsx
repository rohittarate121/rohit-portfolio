import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import {
  getAllSkills,
  createSkill,
  updateSkill,
} from "../../services/skillService.js";
import {
  findDisplayOrderConflict,
  findMissingRequiredFields,
} from "../../utils/displayOrderValidation.js";

const LEVELS = ["PRIMARY", "STRONG", "WORKING_KNOWLEDGE"];
const emptySkill = { name: "", category: "", level: "STRONG", displayOrder: 0 };
const REQUIRED_FIELDS = ["name", "category"];
const OTHER_OPTION = "__other__";

export default function SkillEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptySkill);
  const [siblings, setSiblings] = useState([]);
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllSkills()
      .then((skills) => {
        setSiblings(skills);
        const categories = Array.from(
          new Set(skills.map((s) => s.category).filter(Boolean)),
        ).sort();

        if (isEditMode) {
          const match = skills.find((s) => s.id === Number(id));
          if (match) {
            setForm(match);
            setIsOtherCategory(!categories.includes(match.category));
          }
        } else if (categories.length > 0) {
          setForm((f) => ({ ...f, category: categories[0] }));
        } else {
          setIsOtherCategory(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id, isEditMode]);

  const existingCategories = useMemo(
    () =>
      Array.from(
        new Set(siblings.map((s) => s.category).filter(Boolean)),
      ).sort(),
    [siblings],
  );

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleCategorySelect = (value) => {
    if (value === OTHER_OPTION) {
      setIsOtherCategory(true);
      setField("category", "");
    } else {
      setIsOtherCategory(false);
      setField("category", value);
    }
  };

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
      (s) => s.name,
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
        await updateSkill(id, payload);
      } else {
        await createSkill(payload);
      }
      navigate("/admin/dashboard/skills");
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
        to="/admin/dashboard/skills"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal mb-6"
      >
        <ArrowLeft size={15} /> Back to skills
      </Link>

      <h1 className="font-display text-2xl font-semibold mb-6">
        {isEditMode ? "Edit Skill" : "New Skill"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          label="Name"
          value={form.name}
          onChange={(v) => setField("name", v)}
        />

        <label className="block">
          <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
            Category
          </span>
          <select
            value={isOtherCategory ? OTHER_OPTION : form.category}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="w-full rounded-md border border-void/15 dark:border-white/15 bg-mist dark:bg-void px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
          >
            {existingCategories.length === 0 && (
              <option value="">— no categories yet —</option>
            )}
            {existingCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value={OTHER_OPTION}>+ New category…</option>
          </select>

          {isOtherCategory && (
            <input
              type="text"
              autoFocus
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              placeholder="e.g. Machine Learning"
              className="w-full mt-2 rounded-md border border-signal/40 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
            />
          )}
          <span className="block text-[11px] text-slate-dim dark:text-slate mt-1">
            {isOtherCategory
              ? "This creates a new category card on the public Skills section."
              : "Skill will be added to this existing category's card."}
          </span>
        </label>

        <label className="block">
          <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
            Level
          </span>
          <select
            value={form.level}
            onChange={(e) => setField("level", e.target.value)}
            className="w-full rounded-md border border-void/15 dark:border-white/15 bg-mist dark:bg-void px-3.5 py-2.5 text-sm outline-none focus:border-signal transition-colors text-void dark:text-ink"
          >
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </label>

        <TextField
          label="Display Order"
          type="number"
          value={form.displayOrder}
          onChange={(v) => setField("displayOrder", v)}
          hint="Lower numbers appear first — must be unique across all skills"
        />

        {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving ? "Saving…" : isEditMode ? "Save Changes" : "Create Skill"}
        </Button>
      </form>
    </div>
  );
}

function TextField({ label, value, onChange, type = "text", hint }) {
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
