import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import Badge from "../../components/ui/Badge.jsx";
import {
  getAllProjects,
  deleteProject,
} from "../../services/projectService.js";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();

  const loadProjects = () => {
    setIsLoading(true);
    getAllProjects()
      .then(setProjects)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async () => {
    await deleteProject(pendingDelete.id);
    setPendingDelete(null);
    loadProjects();
  };

  return (
    <>
      <AdminTable
        title="Projects"
        addTo="/admin/dashboard/projects/new"
        isLoading={isLoading}
        rows={projects}
        emptyMessage="No projects yet — add your first one."
        onEdit={(row) => navigate(`/admin/dashboard/projects/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
        columns={[
          {
            label: "Title",
            render: (p) => <span className="font-medium">{p.title}</span>,
          },
          {
            label: "Stack",
            render: (p) => (
              <div className="flex flex-wrap gap-1">
                {p.stack.slice(0, 3).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
                {p.stack.length > 3 && <Badge>+{p.stack.length - 3}</Badge>}
              </div>
            ),
          },
          {
            label: "Featured",
            render: (p) =>
              p.featured ? (
                <span className="text-uptime font-mono text-xs">Yes</span>
              ) : (
                <span className="text-slate-dim dark:text-slate font-mono text-xs">
                  No
                </span>
              ),
          },
        ]}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete project?"
        message={
          pendingDelete
            ? `"${pendingDelete.title}" will be permanently removed from the public site.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
