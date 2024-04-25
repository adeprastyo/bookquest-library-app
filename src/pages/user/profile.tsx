import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { useToken } from "@/utils/contexts/token";

const Profile = () => {
  const { user } = useToken();

  // const [data, setData] = useState<IProfile>();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   try {
  //     const result = await getProfile();

  //     setData(result.payload);
  //     // console.log(result.payload);
  //   } catch (error) {
  //     toast((error as Error).message);
  //   }
  // }

  return (
    <Layout centerX>
      {user ? (
        <div className="w-1/2 flex flex-col items-center gap-5 mt-10">
          <div className="w-1/3">
            <img
              className="rounded-full w-full aspect-square"
              src={user.profile_picture}
              alt={user.full_name}
            />
          </div>
          <p className="text-2xl font-semibold tracking-wide text-black dark:text-white">
            {user.full_name}
          </p>
          <Link to="/profile/edit-profile">
            <Button className="bg-slate-200 text-slate-900 hover:bg-slate-300">
              Edit Profile
            </Button>
          </Link>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </Layout>
  );
};

export default Profile;
