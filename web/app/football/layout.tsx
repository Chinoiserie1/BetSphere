import BetLayout from "@/components/bet-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Link from "next/link";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import PlaceholderContent from "@/components/place-holder-content";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AdminPanelLayout>
        <ContentLayout title="football">
          {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>football</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          {children}
        </ContentLayout>
        {/* {children} */}
      </AdminPanelLayout>
    </div>
    // <BetLayout>{children}</BetLayout>
  );
}
