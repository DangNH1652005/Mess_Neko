import FriendsList from "../components/FriendsList";
import Layout from "./Layout";

const PostLayout = ({ children }) => {
  return (
    <Layout showSidebar={true}>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] mx-auto p-4 sm:p-6 lg:p-8 gap-2">
        <main>{children}</main>

        <aside className="hidden xl:block h-full">
          <div className="sticky top-20">
            <FriendsList />
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default PostLayout;