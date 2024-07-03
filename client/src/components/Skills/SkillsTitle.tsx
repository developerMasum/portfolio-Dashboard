import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateSkillsMutation } from "@/redux/api/skillsApi";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Enter the skill title",
  }),
});

const CreateSkills = () => {
  const router = useRouter();
  const [createSkill, { isLoading }] = useCreateSkillsMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createSkill(values).unwrap();
      toast.success("Skill created successfully");
      router.push("/dashboard/admin");
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 px-10 py-6 border-0">
          <div className="text-center">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your new skill"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-2" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Skill..." : "Create Skill"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSkills;
