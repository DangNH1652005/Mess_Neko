import React, { useEffect, useRef } from "react";
import { usePosts } from "../hooks/post.hook";
import PageLoader from "../components/PageLoader";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import useAuthUser from "../hooks/useAuthUser.hook";

const PostPage = () => {
  const { authUser } = useAuthUser();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <div>
        <CreatePost userId={ authUser._id }/>
      </div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <PageLoader />
        </div>
      )}

      <div ref={loadMoreRef} />
    </section>
  );
};

export default PostPage;
