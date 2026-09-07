import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import {
  getAllExperiences,
  deleteExperience,
} from "../../services/experienceService.js";

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();

  const loadExperiences = () => {
    setIsLoading(true);
    getAllExperiences()
      .then(setExperiences)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleDelete = async () => {
    await deleteExperience(pendingDelete.id);
    setPendingDelete(null);
    loadExperiences();
  };

  return (
    <>
      <AdminTable
        title="Experience"
        addTo="/admin/dashboard/experience/new"
        isLoading={isLoading}
        rows={experiences}
        emptyMessage="No experience entries yet — add your first one."
        onEdit={(row) => navigate(`/admin/dashboard/experience/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
        columns={[
          {
            label: "Role",
            render: (e) => <span className="font-medium">{e.role}</span>,
          },
          {
            label: "Organization",
            render: (e) => <span className="text-sm">{e.organization}</span>,
          },
          {
            label: "Duration",
            render: (e) => (
              <span className="font-mono text-xs">{e.duration}</span>
            ),
          },
          {
            label: "Order",
            render: (e) => (
              <span className="font-mono text-xs text-slate-dim dark:text-slate">
                {e.displayOrder}
              </span>
            ),
          },
        ]}
      />
      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete experience entry?"
        message={
          pendingDelete
            ? `"${pendingDelete.role} at ${pendingDelete.organization}" will be removed from the public site.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
