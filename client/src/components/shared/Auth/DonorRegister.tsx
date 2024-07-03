"use client";

import { z } from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { uploadImage } from "@/utils/UploadImage";
import { useRouter } from "next/navigation";
import { useCreateDonorMutation } from "@/redux/api/userApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email",
  }),
  password: z.string().min(6, {
    message: "Password at least 6 characters",
  }),
  name: z.string().min(1, {
    message: "Enter your Name",
  }),
  age: z.string().min(2, {
    message: "Enter your Age",
  }),
  bio: z.string().min(1, {
    message: "Enter your Bio",
  }),

  contactNumber: z.string().regex(/^01[3-9]\d{8}$/, {
    message: "Phone number must start with 01 and must be 11 digits long",
  }),
  bloodType: z.string().min(1, {
    message: "Enter your blood Type ",
  }),
  location: z.string().min(1, {
    message: "Enter your location",
  }),
  profilePhoto: z.any(),
});

const DonorRegister = () => {
  const router = useRouter();
  const [createUser, { isLoading, isError }] = useCreateDonorMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      age: "",

      profilePhoto: null,
      contactNumber: "",
      location: "",
      bloodType: "",
      bio: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.profilePhoto && values.profilePhoto.length > 0) {
      const url = await uploadImage(values.profilePhoto[0]);
      values.profilePhoto = url;
    } else {
      values.profilePhoto = "";
    }

    console.log(values, "values.........");
    try {
      const res = await createUser(values).unwrap();
      console.log(res, "res...........");
      if (res?.data?.id) {
        toast.success("Account created successfully");
        router.push("/login");
      }
    } catch (err: any) {
      toast(err?.message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 px-10 py-6 border-0 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="use format (A+,A-,B+,B-,AB+,AB-,O+,O-)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Blood Group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your age"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your contact number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Bio </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your something about you"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>profilePhoto</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-2" type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
          <div>
            {`If you have an account, please `}
            <Link href="/login" className="text-red-800 ml-2 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DonorRegister;
