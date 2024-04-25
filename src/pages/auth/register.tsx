import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { userRegister } from "@/utils/apis/auth/api";
import { RegisterSchema, registerSchema } from "@/utils/apis/auth/type";
import { Separator } from "@/components/ui/separator";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      address: "",
      phone_number: "",
      password: "",
      repassword: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const result = await userRegister(data);

      toast(result.message);
      navigate("/login");
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout centerY centerX>
      <Card className="w-full md:w-1/2 bg-slate-900 text-white border-slate-500">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription className="text-white">
            Register your account now!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <CustomFormField
                control={form.control}
                name="full_name"
                label="Full Name"
              >
                {(field) => (
                  <Input
                    {...field}
                    className="bg-slate-900 border-slate-500"
                    placeholder="John Doe"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
              >
                {(field) => (
                  <Input
                    {...field}
                    className="bg-slate-900 border-slate-500"
                    placeholder="john_doe@mail.com"
                    type="email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="address"
                label="Address"
              >
                {(field) => (
                  <Input
                    {...field}
                    className="bg-slate-900 border-slate-500"
                    placeholder="Address"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="phone_number"
                label="Phone Number"
              >
                {(field) => (
                  <Input
                    {...field}
                    className="bg-slate-900 border-slate-500"
                    placeholder="628xxxxxxxxxx"
                    type="tel"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="password"
                label="Password"
              >
                {(field) => (
                  <Input
                    {...field}
                    className="bg-slate-900 border-slate-500"
                    placeholder="Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="repassword"
                label="Confirm Password"
              >
                {(field) => (
                  <Input
                    {...field}
                    className="bg-slate-900 border-slate-500"
                    placeholder="Confirm Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <div className="flex flex-col mt-20 gap-4">
                <Button
                  type="submit"
                  className="bg-slate-200 text-slate-950 hover:bg-slate-400 "
                >
                  Submit
                </Button>
                <div className="w-full flex items-center text-center text-xs font-thin">
                  <div className="w-1/2">
                    <Separator className="bg-slate-500" />
                  </div>
                  <p className="mx-1">OR</p>
                  <div className="w-1/2">
                    <Separator className="bg-slate-500" />
                  </div>
                </div>
                <Button
                  className="bg-slate-200 text-slate-950 hover:bg-slate-400 "
                  type="button"
                  variant="secondary"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Register;

// import { FormEvent, useState } from "react";
// import { toast } from "sonner";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Layout from "@/components/layout";
// import { userRegister } from "@/utils/apis/auth/api";

// const Register = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   async function onSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const body = {
//       full_name: fullName,
//       email,
//       password,
//       role: "user",
//       address,
//       phone_number: phoneNumber,
//     };

//     try {
//       const result = await userRegister(body);

//       toast(result.message);
//     } catch (error) {
//       toast((error as Error).message.toString());
//     }
//   }
//   return (
//     <Layout centerY centerX>
//       <Card className="w-full md:w-1/2 bg-slate-900 text-white border-slate-500">
//         <CardHeader>
//           <CardTitle>Register</CardTitle>
//           <CardDescription className="text-white">
//             Register your account now!
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form className="space-y-4" onSubmit={onSubmit}>
//             <Input
//               className="bg-slate-900 border-slate-500"
//               placeholder="John Doe"
//               required
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//             <Input
//               className="bg-slate-900 border-slate-500"
//               placeholder="john_doe@mail.com"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//               className="bg-slate-900 border-slate-500"
//               placeholder="Password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Input
//               className="bg-slate-900 border-slate-500"
//               placeholder="Address"
//               required
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//             <Input
//               className="bg-slate-900 border-slate-500"
//               placeholder="628xxxxxxxxxx"
//               type="tel"
//               required
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             <Button
//               className="bg-slate-300 text-slate-950 hover:bg-slate-200 "
//               type="submit"
//             >
//               Submit
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Layout>
//   );
// };

// export default Register;

// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import Layout from "@/components/layout";

// // const Register = () => {
// //   return (
// //     <Layout centerY centerX>
// //       <Card className="w-full md:w-1/2 bg-slate-900 text-white border-slate-500">
// //         <CardHeader>
// //           <CardTitle>Register</CardTitle>
// //           <CardDescription>Register your account now!</CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <form className="space-y-4">
// //             <Input
// //               className="bg-slate-900 border-slate-500"
// //               placeholder="John Doe"
// //             />
// //             <Input
// //               className="bg-slate-900 border-slate-500"
// //               placeholder="john_doe@mail.com"
// //               type="email"
// //             />
// //             <Input
// //               className="bg-slate-900 border-slate-500"
// //               placeholder="Password"
// //               type="password"
// //             />
// //             <Input
// //               className="bg-slate-900 border-slate-500"
// //               placeholder="Address"
// //             />
// //             <Input
// //               className="bg-slate-900 border-slate-500"
// //               placeholder="628xxxxxxxxxx"
// //               type="tel"
// //             />
// //             <Button className="bg-slate-300 text-slate-950" type="submit">
// //               Submit
// //             </Button>
// //           </form>
// //         </CardContent>
// //       </Card>
// //     </Layout>
// //   );
// // };

// // export default Register;
