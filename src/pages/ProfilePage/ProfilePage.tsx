import { NavLink, useParams } from "react-router-dom";
import useFetch from "../../lib/CustomHooks/useFetch";
import { IUser } from "../../lib/types/User";
import { FaShareAlt } from "react-icons/fa";
import Breadcrumb from "../../components/universal/BreadCrumb";

const ProfilePage = () => {
  const { username } = useParams();
  const { response: userProfile } = useFetch<IUser>({
    url: `/profile/${username}`,
  });

  const isUserOwner = userProfile?.username === username;

  return (
    <main className="relative w-full grow pt-24">
      <div className="flex h-fit min-h-full w-full flex-col items-center justify-center gap-8">
        <Breadcrumb className="max-w-[1000px] px-4" />
        <div className="aspect-square h-auto w-64 overflow-hidden rounded-full border-2 bg-gray-50">
          <img src={userProfile?.profilePicUrl} alt="" />
        </div>
        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center px-2">
          <h1 className="text-2xl">{userProfile?.displayName}</h1>
          <div className="flex items-center gap-2">
            {isUserOwner && (
              <NavLink
                to={`/profile/${username}/edit`}
                className="rounded-md bg-purple-300 p-2 text-purple-950 hover:bg-purple-400"
              >
                Edit
              </NavLink>
            )}
            <button className="flex items-center gap-2 rounded-md bg-blue-200 p-2 text-blue-700 hover:bg-blue-300">
              <FaShareAlt size={25} />
              Share
            </button>
          </div>
        </div>
        <section className="flex w-full max-w-[1000px] flex-col items-start px-4">
          <div className="flex w-full justify-between">
            <h2>Reports</h2>
            <button className="hover:text-blue-600">See More &gt;</button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
