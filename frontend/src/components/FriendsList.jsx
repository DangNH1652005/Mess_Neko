import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../services/user.service";
import PageLoader from "./PageLoader";

const FriendsList = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body flex justify-center py-8">
          <PageLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body p-0">
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
          <h2 className="font-semibold text-lg">Bạn bè</h2>

          <div className="badge badge-neutral">{friends.length}</div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {friends.length === 0 ? (
            <p className="text-center text-base-content/60 py-8">
              Chưa có bạn bè
            </p>
          ) : (
            friends.map((friend) => (
              <div
                key={friend._id}
                className="flex items-center gap-3 px-5 py-3 hover:bg-base-200 cursor-pointer transition"
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={friend.profilePic} alt={friend.fullName} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{friend.fullName}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
