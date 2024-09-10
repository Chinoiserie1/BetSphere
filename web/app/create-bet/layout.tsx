import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AdminPanelLayout>
        <ContentLayout title="Create bet">{children}</ContentLayout>
      </AdminPanelLayout>
    </div>
  );
}
