import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container h-[calc(100vh_-_112px)] pt-2 pb-2 px-4 sm:px-8">
        {children}
      </div>
    </div>
  );
}
