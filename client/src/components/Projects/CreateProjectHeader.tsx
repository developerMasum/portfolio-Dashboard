import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateProjectHeader = () => {
  return (
    <div className="text-center">
      <Link
        href={"/dashboard/admin/projects/create-project"}
        className="uppercase w-1/6 px-3 py-3 font-semibold  bg-teal-600 text-white text-sm rounded-md flex gap-2 my-4"
      >
        ADD a new project <Plus />
      </Link>
    </div>
  );
};

export default CreateProjectHeader;
