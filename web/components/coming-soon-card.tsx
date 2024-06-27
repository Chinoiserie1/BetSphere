import { Card } from "./ui/card";

export default function ComingSoonCard() {
  return (
    <div className="flex w-full h-full ">
      <div className="flex w-full h-full justify-center items-center">
        <Card className="p-8">
          <h1 className="text-2xl font-bold">Coming Soon...</h1>
        </Card>
      </div>
    </div>
  );
}
