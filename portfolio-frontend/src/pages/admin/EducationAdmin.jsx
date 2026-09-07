import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import {
  getAllEducation,
  deleteEducation,
} from "../../services/educationService.js";

export default function EducationAdmin() {
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();

  const loadEducation = () => {
    setIsLoading(true);
    getAllEducation()
      .then(setEducation)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const handleDelete = async () => {
    await deleteEducation(pendingDelete.id);
    setPendingDelete(null);
    loadEducation();
  };

  return (
    <>
      <AdminTable
        title="Education"
        addTo="/admin/dashboard/education/new"
        isLoading={isLoading}
        rows={education}
        emptyMessage="No education entries yet — add your first one."
        onEdit={(row) => navigate(`/admin/dashboard/education/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
        columns={[
          {
            label: "Degree",
            render: (e) => <span className="font-medium">{e.degree}</span>,
          },
          {
            label: "Institution",
            render: (e) => <span className="text-sm">{e.institution}</span>,
          },
          {
            label: "Period",
            render: (e) => (
              <span className="font-mono text-xs">{e.period}</span>
            ),
          },
        ]}
      />
      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete education entry?"
        message={
          pendingDelete
            ? `"${pendingDelete.degree}" will be removed from the public About section.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
