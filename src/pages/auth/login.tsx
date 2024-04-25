import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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

import { userLogin } from "@/utils/apis/auth/api";

import { LoginSchema, loginSchema } from "@/utils/apis/auth/type";
import { Separator } from "@/components/ui/separator";
import { useToken } from "@/utils/contexts/token";

const Login = () => {
  const { changeToken } = useToken();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const result = await userLogin(data);

      changeToken(result.payload.token);

      // localStorage.setItem("token", result.payload.token);
      // const profileResult = await getProfile();
      // localStorage.setItem("role", profileResult.payload.role);

      toast(result.message);
      navigate("/");
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout centerY centerX>
      <Card className="w-full md:w-1/2 bg-slate-900 text-white border-slate-500">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription className="text-white">
            Login to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // async function onSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   const body = {
  //     email,
  //     password,
  //   };

  //   try {
  //     const result = await userLogin(body);
  //     localStorage.setItem("token", result.payload.token);
  //     const profileResult = await getProfile();
  //     localStorage.setItem("role", profileResult.payload.role);

  //     toast(result.message);
  //     navigate("/");
  //   } catch (error) {
  //     toast((error as Error).message.toString());
  //   }
  // }

  // return (
  //   <Layout centerY centerX>
  //     <Card className="w-full md:w-1/2 bg-slate-900 text-white border-slate-500">
  //       <CardHeader>
  //         <CardTitle>Login</CardTitle>
  //         <CardDescription className="text-white">
  //           Login to access your account
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <form className="space-y-4" onSubmit={onSubmit}>
  //           <Input
  //             className="bg-slate-900 border-slate-500"
  //             placeholder="john_doe@mail.com"
  //             type="email"
  //             name="email"
  //             required
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //           <Input
  //             className="bg-slate-900 border-slate-500"
  //             placeholder="Password"
  //             type="password"
  //             name="password"
  //             required
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //           <Button
  //             className="bg-slate-300 text-slate-950 hover:bg-slate-200 "
  //             type="submit"
  //           >
  //             Submit
  //           </Button>
  //           <Button className="bg-slate-300 text-slate-950 hover:bg-slate-200 ">
  //             <Link to="/register">Register</Link>
  //           </Button>
  //         </form>
  //       </CardContent>
  //     </Card>
  //   </Layout>
  // );
};

export default Login;
