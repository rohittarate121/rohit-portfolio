import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminOverview from "./pages/admin/AdminOverview.jsx";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin.jsx";
import ProjectEditor from "./pages/admin/ProjectEditor.jsx";
import SkillsAdmin from "./pages/admin/SkillsAdmin.jsx";
import SkillEditor from "./pages/admin/SkillEditor.jsx";
import CertificationsAdmin from "./pages/admin/CertificationsAdmin.jsx";
import CertificationEditor from "./pages/admin/CertificationEditor.jsx";
import ExperienceAdmin from "./pages/admin/ExperienceAdmin.jsx";
import ExperienceEditor from "./pages/admin/ExperienceEditor.jsx";
import EducationAdmin from "./pages/admin/EducationAdmin.jsx";
import EducationEditor from "./pages/admin/EducationEditor.jsx";
import BlogAdmin from "./pages/admin/BlogAdmin.jsx";
import BlogEditor from "./pages/admin/BlogEditor.jsx";
import ResumeAdmin from "./pages/admin/ResumeAdmin.jsx";
import ContactMessagesAdmin from "./pages/admin/ContactMessagesAdmin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-mist dark:bg-void text-void dark:text-ink font-body">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <PublicLayout>
              <ProjectDetail />
            </PublicLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <PublicLayout>
              <Blog />
            </PublicLayout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PublicLayout>
              <BlogPost />
            </PublicLayout>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="projects/new" element={<ProjectEditor />} />
          <Route path="projects/:id/edit" element={<ProjectEditor />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="skills/new" element={<SkillEditor />} />
          <Route path="skills/:id/edit" element={<SkillEditor />} />
          <Route path="certifications" element={<CertificationsAdmin />} />
          <Route path="certifications/new" element={<CertificationEditor />} />
          <Route
            path="certifications/:id/edit"
            element={<CertificationEditor />}
          />
          <Route path="experience" element={<ExperienceAdmin />} />
          <Route path="experience/new" element={<ExperienceEditor />} />
          <Route path="experience/:id/edit" element={<ExperienceEditor />} />
          <Route path="education" element={<EducationAdmin />} />
          <Route path="education/new" element={<EducationEditor />} />
          <Route path="education/:id/edit" element={<EducationEditor />} />
          <Route path="blog" element={<BlogAdmin />} />
          <Route path="blog/new" element={<BlogEditor />} />
          <Route path="blog/:id/edit" element={<BlogEditor />} />
          <Route path="resume" element={<ResumeAdmin />} />
          <Route path="messages" element={<ContactMessagesAdmin />} />
        </Route>

        <Route
          path="*"
          element={
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
