import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Common = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-2xl font-semibold mb-4">Welcome to Dashboard</p>
        <div>
          <Link href="/dashboard/admin" passHref>
            <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Common;
