import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";

import {
  deleteProfile,
  getProfile,
  updateProfile,
} from "@/utils/apis/user/api";
import { IProfile } from "@/utils/apis/user/type";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [data, setData] = useState<IProfile>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { payload } = await getProfile();

      setData(payload);
      setFullName(payload.full_name);
      setEmail(payload.email);
      setAddress(payload.address);
      setPhoneNumber(payload.phone_number);
    } catch (error) {
      toast((error as Error).message);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = {
      email,
      full_name: fullName,
      password,
      phone_number: phoneNumber,
      address,
    };

    try {
      const result = await updateProfile(body);

      toast(result.message);
    } catch (error) {
      toast((error as Error).message);
    }
  }

  async function handleDelete() {
    try {
      const result = await deleteProfile();

      toast(result.message);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <Layout centerX centerY>
      <Card className="w-full md:w-1/2 bg-slate-900 text-white border-slate-500">
        {data ? (
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <CardHeader className="px-0 py-5 space-y-3">
                <Link to="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>

              <div>
                <label>Full Name</label>
                <Input
                  className="bg-slate-900 border-slate-500 mt-1"
                  placeholder="Full Name"
                  name="full_name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label>Email</label>
                <Input
                  className="bg-slate-900 border-slate-500 mt-1"
                  placeholder="john_doe@mail.com"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label>Password</label>
                <Input
                  className="bg-slate-900 border-slate-500 mt-1"
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label>Address</label>
                <Input
                  className="bg-slate-900 border-slate-500 mt-1"
                  placeholder="Address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label>No Hp</label>
                <Input
                  className="bg-slate-900 border-slate-500 mt-1"
                  placeholder="Phone Number"
                  type="tel"
                  name="phone_number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div>
                <label>Profile Picture</label>
                <Input
                  className="bg-slate-900 border-slate-500 mt-1"
                  placeholder="Profile Picture"
                  type="file"
                  name="profile_picture"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="bg-slate-200 text-slate-950 hover:bg-slate-300 me-3"
                >
                  Submit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"destructive"}>Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-900 text-white border-slate-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-slate-900">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="hover:bg-red-700"
                        onClick={() => handleDelete()}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </form>
          </CardContent>
        ) : (
          <p>Loading</p>
        )}
      </Card>
    </Layout>
  );
};

export default EditProfile;

// import Layout from "@/components/layout";

// function EditProfile() {
//   return (
//     <Layout centerX centerY>
//       <Card className="w-full md:w-1/2 bg-slate-900 text-white border-slate-500">
//         <CardHeader>
//           <CardTitle>Edit Profile</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form className="space-y-4">
//             <div>
//               <label>Full Name</label>
//               <Input
//                 className="bg-slate-900 border-slate-500"
//                 placeholder="John Doe"
//                 required
//               />
//             </div>

//             <div>
//               <label>Email</label>
//               <Input
//                 className="bg-slate-900 border-slate-500"
//                 placeholder="john_doe@mail.com"
//                 type="email"
//                 required
//               />
//             </div>

//             <div>
//               <label>Password</label>
//               <Input
//                 className="bg-slate-900 border-slate-500"
//                 placeholder="Password"
//                 type="password"
//                 required
//               />
//             </div>

//             <div>
//               <label>Address</label>
//               <Input
//                 className="bg-slate-900 border-slate-500"
//                 placeholder="Address"
//                 required
//               />
//             </div>

//             <div>
//               <label>Phone Number</label>
//               <Input
//                 className="bg-slate-900 border-slate-500"
//                 placeholder="628xxxxxxxxxx"
//                 type="tel"
//                 required
//               />
//             </div>

//             <div>
//               <label>Profile Picture</label>
//               <Input
//                 className="bg-slate-900 border-slate-500 text-white"
//                 type="file"
//                 required
//               />
//             </div>

//             <div>
//               <Button
//                 className="bg-slate-200 text-slate-950 hover:bg-slate-300 me-3"
//                 type="submit"
//               >
//                 Submit
//               </Button>

//               <Button variant="destructive" type="submit">
//                 Delete Account
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </Layout>
//   );
// }

// export default EditProfile;
