import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import { getAllPostsForAdmin, deletePost } from "../../services/blogService.js";

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();

  const loadPosts = () => {
    setIsLoading(true);
    getAllPostsForAdmin()
      .then(setPosts)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async () => {
    await deletePost(pendingDelete.id);
    setPendingDelete(null);
    loadPosts();
  };

  return (
    <>
      <AdminTable
        title="Blog"
        addTo="/admin/dashboard/blog/new"
        isLoading={isLoading}
        rows={posts}
        emptyMessage="No posts yet — add your first one."
        onEdit={(row) => navigate(`/admin/dashboard/blog/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
        columns={[
          {
            label: "Title",
            render: (p) => <span className="font-medium">{p.title}</span>,
          },
          {
            label: "Category",
            render: (p) => (
              <span className="font-mono text-xs">{p.category}</span>
            ),
          },
          {
            label: "Status",
            render: (p) => (
              <span
                className={`inline-flex items-center gap-1.5 font-mono text-xs ${p.status === "PUBLISHED" ? "text-uptime" : "text-amber"}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${p.status === "PUBLISHED" ? "bg-uptime" : "bg-amber"}`}
                />
                {p.status}
              </span>
            ),
          },
          {
            label: "Reading Time",
            render: (p) => (
              <span className="font-mono text-xs text-slate-dim dark:text-slate">
                {p.readingTimeMinutes} min
              </span>
            ),
          },
        ]}
      />
      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete post?"
        message={
          pendingDelete
            ? `"${pendingDelete.title}" will be permanently deleted.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
