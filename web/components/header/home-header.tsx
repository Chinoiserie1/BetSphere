import { ModeToggle } from "@/components/mode-toggle";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { UserToggle } from "@/components/user-toggle";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary bg-[url('/hightligthsBanner.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="mx-4 sm:mx-8 flex h-28 sm:h-32 items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
        </div>
        <h1 className="flex font-extrabold items-center text-2xl sm:text-4xl">
          H I G H L I G H T S
        </h1>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <UserToggle />
        </div>
      </div>
    </header>
  );
}
