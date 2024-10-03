import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import HomeHeader from "@/components/header/home-header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AdminPanelLayout>
        {/* <ContentLayout title="Home">{children}</ContentLayout> */}
        <HomeHeader />
        {children}
      </AdminPanelLayout>
    </div>
  );
}
