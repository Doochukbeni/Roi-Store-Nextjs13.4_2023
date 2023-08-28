import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/Separator";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3"></div>
      </div>
    </div>
  );
};

export default Dashboard;
