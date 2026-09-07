import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import Eyebrow from "../ui/Eyebrow.jsx";
import Button from "../ui/Button.jsx";
import { profile } from "../../data/portfolio.js";
import { submitContactMessage } from "../../services/contactService.js";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "A valid email is required.";
    if (!form.message.trim()) e.message = "Message can't be empty.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!validate()) return;

    try {
      setStatus("sending");
      await submitContactMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 border-t border-void/5 dark:border-white/5"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-[0.8fr_1.2fr] gap-16">
        <div>
          <Eyebrow>POST /contact</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
            Contact
          </h2>
          <p className="text-slate-dim dark:text-slate leading-relaxed mb-8">
            Open to Software Developer, Full Stack, and Backend Developer roles.
            Reach out directly, or send a message here.
          </p>
          <div className="space-y-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-void dark:text-ink hover:text-signal transition-colors"
            >
              <Mail size={16} className="text-signal" /> {profile.email}
            </a>
            <div className="flex items-center gap-3 text-void dark:text-ink">
              <Phone size={16} className="text-signal" /> {profile.phone}
            </div>
            <div className="flex items-center gap-3 text-void dark:text-ink">
              <MapPin size={16} className="text-signal" /> {profile.location}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              error={errors.name}
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              error={errors.email}
            />
          </div>
          <Field
            label="Subject"
            value={form.subject}
            onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
          />
          <Field
            label="Message"
            textarea
            value={form.message}
            onChange={(v) => setForm((f) => ({ ...f, message: v }))}
            error={errors.message}
          />

          {/* Honeypot — off-screen and out of the tab order, so real
              visitors (including keyboard/screen-reader users) never
              encounter it. Anything that fills it in is a bot. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.honeypot}
              onChange={(e) =>
                setForm((f) => ({ ...f, honeypot: e.target.value }))
              }
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              "Sending…"
            ) : status === "sent" ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} /> Sent
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Send size={16} /> Send Message
              </span>
            )}
          </Button>

          {status === "sent" && (
            <p className="text-sm text-uptime font-mono">
              Message sent — I&rsquo;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400 font-mono">
              Something went wrong — email {profile.email} directly instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  error,
}) {
  const commonClasses =
    "w-full rounded-md border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors " +
    (error
      ? "border-red-400"
      : "border-void/15 dark:border-white/15 focus:border-signal");

  return (
    <label className="block">
      <span className="block text-xs font-mono text-slate-dim dark:text-slate mb-1.5">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={commonClasses}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={commonClasses}
        />
      )}
      {error && (
        <span className="block text-xs text-red-400 mt-1">{error}</span>
      )}
    </label>
  );
}
