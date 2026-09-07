import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";
import {
  getAllCertifications,
  deleteCertification,
} from "../../services/certificationService.js";

export default function CertificationsAdmin() {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();

  const loadCertifications = () => {
    setIsLoading(true);
    getAllCertifications()
      .then(setCertifications)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCertifications();
  }, []);

  const handleDelete = async () => {
    await deleteCertification(pendingDelete.id);
    setPendingDelete(null);
    loadCertifications();
  };

  return (
    <>
      <AdminTable
        title="Certifications"
        addTo="/admin/dashboard/certifications/new"
        isLoading={isLoading}
        rows={certifications}
        emptyMessage="No certifications yet — add your first one."
        onEdit={(row) =>
          navigate(`/admin/dashboard/certifications/${row.id}/edit`)
        }
        onDelete={(row) => setPendingDelete(row)}
        columns={[
          {
            label: "Name",
            render: (c) => <span className="font-medium">{c.name}</span>,
          },
          {
            label: "Organization",
            render: (c) => <span className="text-sm">{c.organization}</span>,
          },
          {
            label: "Date",
            render: (c) => <span className="font-mono text-xs">{c.date}</span>,
          },
        ]}
      />
      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete certification?"
        message={
          pendingDelete
            ? `"${pendingDelete.name}" will be removed from the public site.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
