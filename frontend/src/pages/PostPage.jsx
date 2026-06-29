import React, { useEffect, useRef } from "react";
import { usePosts } from "../hooks/post.hook";
import PageLoader from "../components/PageLoader";
import PostCard from "../components/PostCard";

const PostPage = () => {
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
    <section className="max-w-5xl mx-auto space-y-4">
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
