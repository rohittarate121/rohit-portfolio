import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { getAllSkills, deleteSkill } from "../../services/skillService.js";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();

  const loadSkills = () => {
    setIsLoading(true);
    getAllSkills()
      .then(setSkills)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleDelete = async () => {
    await deleteSkill(pendingDelete.id);
    setPendingDelete(null);
    loadSkills();
  };

  return (
    <>
      <AdminTable
        title="Skills"
        addTo="/admin/dashboard/skills/new"
        isLoading={isLoading}
        rows={skills}
        emptyMessage="No skills yet — add your first one."
        onEdit={(row) => navigate(`/admin/dashboard/skills/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
        columns={[
          {
            label: "Name",
            render: (s) => <span className="font-medium">{s.name}</span>,
          },
          {
            label: "Category",
            render: (s) => (
              <span className="font-mono text-xs">{s.category}</span>
            ),
          },
          {
            label: "Level",
            render: (s) => <span className="font-mono text-xs">{s.level}</span>,
          },
          {
            label: "Order",
            render: (s) => (
              <span className="font-mono text-xs text-slate-dim dark:text-slate">
                {s.displayOrder}
              </span>
            ),
          },
        ]}
      />
      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete skill?"
        message={
          pendingDelete
            ? `"${pendingDelete.name}" will be removed from the public Skills section.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
