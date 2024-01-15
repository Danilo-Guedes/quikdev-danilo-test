import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../api/post";
import PostCard from "./PostCard";
import SocialMediaSvg from "@/src/svg/social-media.svg";
import Spinner from "../../../components/shared/Spinner";

const PostListing = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 mb-32 scale-[2.5]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-lg font-bold text-red-500">Error fetching posts</div>
    );
  }

  if (!posts.length) {
    return (
      <div className="max-w-[500px] flex flex-col items-center justify-center gap-10 mb-20 ">
        <span className="text-lg font-bold text-center text-gray-600">
          Opa! Ainda não temos nenhum Post cadastrado, qua tal ser o primeiro?
          Preencha o formulário acima.
        </span>
        <img src={SocialMediaSvg} alt="No posts" width={900} height={900} />
      </div>
    );
  }

  return (
    <>
    <h1 className="text-3xl font-semibold mb-20 text-gray-600">Postagens mais recentes:</h1>
    <div className="flex flex-col items-center gap-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
    
    </>
  );
};

export default PostListing;
