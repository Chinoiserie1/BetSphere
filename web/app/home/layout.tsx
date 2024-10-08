import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import HomeHeader from "@/components/header/home-header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AdminPanelLayout>
        <HomeHeader />
        <div className="h-[calc(100vh_-_168px)] sm:h-[calc(100vh_-_188px)] w-full">
          {children}
        </div>
      </AdminPanelLayout>
    </div>
  );
}
