import { useEffect, useState } from "react";
import { Eye, Mail } from "lucide-react";
import AdminTable from "../../components/admin/AdminTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import Modal from "../../components/ui/Modal.jsx";
import {
  getAllContactMessages,
  markContactMessageAsRead,
  deleteContactMessage,
} from "../../services/contactService.js";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewing, setViewing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const loadMessages = () => {
    setIsLoading(true);
    getAllContactMessages()
      .then(setMessages)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleView = async (message) => {
    setViewing(message);
    if (!message.isRead) {
      const updated = await markContactMessageAsRead(message.id);
      setMessages((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m)),
      );
      setViewing(updated);
    }
  };

  const handleDelete = async () => {
    await deleteContactMessage(pendingDelete.id);
    setPendingDelete(null);
    loadMessages();
  };

  return (
    <>
      <AdminTable
        title="Contact Messages"
        isLoading={isLoading}
        rows={messages}
        emptyMessage="No messages yet."
        editIcon={Eye}
        editLabel="View"
        onEdit={handleView}
        onDelete={(row) => setPendingDelete(row)}
        columns={[
          {
            label: "Status",
            render: (m) =>
              m.isRead ? (
                <span className="font-mono text-xs text-slate-dim dark:text-slate">
                  Read
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-signal">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Unread
                </span>
              ),
          },
          {
            label: "From",
            render: (m) => (
              <span className={m.isRead ? "" : "font-semibold"}>{m.name}</span>
            ),
          },
          {
            label: "Subject",
            render: (m) => (
              <span className="text-sm">
                {m.subject || (
                  <span className="text-slate-dim dark:text-slate italic">
                    (no subject)
                  </span>
                )}
              </span>
            ),
          },
          {
            label: "Received",
            render: (m) => (
              <span className="font-mono text-xs text-slate-dim dark:text-slate">
                {formatDate(m.createdAt)}
              </span>
            ),
          },
        ]}
      />

      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title={viewing?.subject || "Message"}
      >
        {viewing && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail size={14} className="text-signal" />
              <a
                href={`mailto:${viewing.email}`}
                className="text-signal hover:underline"
              >
                {viewing.name} &lt;{viewing.email}&gt;
              </a>
            </div>
            <p className="text-xs font-mono text-slate-dim dark:text-slate">
              {formatDate(viewing.createdAt)}
            </p>
            <p className="text-sm text-void dark:text-ink whitespace-pre-wrap leading-relaxed border-t border-void/10 dark:border-white/10 pt-4">
              {viewing.message}
            </p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete message?"
        message={
          pendingDelete
            ? `The message from "${pendingDelete.name}" will be permanently deleted.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
