"use client";
import React from "react";
import CreateSkills from "@/components/Skills/SkillsTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllSkillsQuery } from "@/redux/api/skillsApi";

type TSkills = {
  id: string;
  title: string;
};

const SkillsPage = () => {
  const { data, isLoading } = useGetAllSkillsQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-semibold">Loading.....</p>
      </div>
    );
  }

  const skills: TSkills[] = data?.skills as TSkills[];

  if (!data || !data.skills || skills.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-semibold">You don&apos;t have any Skills</p>
      </div>
    );
  }

  const thirdIndex = Math.ceil(skills.length / 3);
  const firstThird = skills.slice(0, thirdIndex);
  const secondThird = skills.slice(thirdIndex, thirdIndex * 2);
  const finalThird = skills.slice(thirdIndex * 2);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Skills Management</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
          <CreateSkills />
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Existing Skills</h2>
          <div className="flex gap-4">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Skills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {firstThird?.map((skill: TSkills, index) => (
                  <TableRow key={skill?.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {skill?.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Skills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {secondThird?.map((skill: TSkills, index) => (
                  <TableRow key={skill?.id}>
                    <TableCell className="font-medium">
                      {thirdIndex + index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {skill?.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Skills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalThird?.map((skill: TSkills, index) => (
                  <TableRow key={skill?.id}>
                    <TableCell className="font-medium">
                      {thirdIndex * 2 + index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {skill?.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
