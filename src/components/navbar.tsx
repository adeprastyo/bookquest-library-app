import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToken } from "@/utils/contexts/token";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { Cart } from "./cart";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Navbar() {
  const { changeToken, token, user, setTheme } = useToken();
  const navigate = useNavigate();

  // const [fullname, setFullname] = useState("");
  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const profile = await getProfile();
  //       setFullname(profile.payload.full_name);
  //     } catch (error) {
  //       toast((error as Error).message.toString());
  //     }
  //   };

  //   if (token) {
  //     fetchProfile();
  //   }
  // }, [token]);

  const handleLogout = () => {
    changeToken();
    toast("Logout successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="text-white mb-5 z-10 sticky left-0 right-0 top-0">
        <div className="container flex gap-8 justify-around items-center py-5 px-6 bg-slate-900">
          {/* logo */}
          <div className="w-2/3">
            <h1 className="text-2xl font-semibold tracking-wider">
              <Link to="/">Bookquest</Link>
            </h1>
          </div>

          {/* search bar */}
          <div className="flex w-1/4 items-center space-x-2">
            <Input
              className="text-black bg-slate-100"
              type="text"
              placeholder="Search"
            />
            <Button type="submit" className="pe-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>

          {token ? (
            <>
              {user?.role === "user" ? (
                /* user */
                <>
                  <div>
                    <Cart />
                  </div>

                  <div className="me-2 flex gap-4 items-center justify-end h-full">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar className="">
                          <AvatarImage
                            src={user?.profile_picture}
                            alt={user?.full_name}
                          />
                          <AvatarFallback>LA</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>{" "}
                      {/* user */}
                      <DropdownMenuContent
                        className="bg-slate-900 text-white border-slate-600 w-44"
                        align="end"
                        forceMount
                      >
                        <DropdownMenuLabel>
                          Hi! {user?.full_name}
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="bg-slate-500" />
                        <Link to="/profile">
                          <DropdownMenuItem className="cursor-pointer">
                            Profile
                          </DropdownMenuItem>
                        </Link>
                        <Link to="">
                          <DropdownMenuItem className="cursor-pointer">
                            My Books
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-slate-900 text-white border-slate-600">
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setTheme("light")}
                              >
                                Light
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setTheme("dark")}
                              >
                                Dark
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setTheme("system")}
                              >
                                System
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator className="bg-slate-500" />

                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer"
                        >
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                /* admin */
                <div className="me-2 flex gap-4 items-center justify-end h-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="">
                        <AvatarImage
                          src={user?.profile_picture}
                          alt={user?.full_name}
                        />
                        <AvatarFallback>LA</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>{" "}
                    <DropdownMenuContent
                      className="bg-slate-900 text-white border-slate-600 w-44"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel>
                        Hi! {user?.full_name}
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator className="bg-slate-500" />

                      <Link to="/profile">
                        <DropdownMenuItem className="cursor-pointer">
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                          Dashboard
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="bg-slate-900 text-white border-slate-600">
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => setTheme("light")}
                            >
                              Light
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => setTheme("dark")}
                            >
                              Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => setTheme("system")}
                            >
                              System
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      <DropdownMenuSeparator className="bg-slate-500" />

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </>
          ) : (
            /* No Login */
            <div className="me-4">
              <DropdownMenu>
                <DropdownMenuTrigger>User</DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-slate-900 text-white border-slate-600 w-44"
                  align="end"
                  forceMount
                >
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-slate-900 text-white border-slate-600">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setTheme("light")}
                        >
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setTheme("dark")}
                        >
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setTheme("system")}
                        >
                          System
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator className="bg-slate-500" />
                  <Link to="/login" className="cursor-pointer">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link to="/register" className="cursor-pointer">
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
