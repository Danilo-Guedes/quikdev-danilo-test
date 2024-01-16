/* eslint-disable react/prop-types */
import { User2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import AddNewComment from "./AddNewComment";
import Comments from "./Comments";

function PostCard({ post }) {
  return (
    <Card
      key={post.id}
      className="flex flex-col p-2 lg:p-10 shadow-2xl "
    >
      <CardHeader className="">
        <div className="flex flex-row gap-5 mb-5">
          <User2Icon />
          <span>{post.user.name}</span>
        </div>
        <img
          src={`http://localhost:3000/${post.file_path}`}
          alt="Post Image"
          className="h-96 w-96"
        />
      </CardHeader>
      <CardContent className="lg:p-0 gap-5  mb-2 flex flex-wrap lg:w-96 self-center">
        <CardTitle>
          <span className="line-clamp-2 text-wrap">{post.title}</span>
        </CardTitle>
        <CardDescription className="flex flex-wrap  overflow-auto max-h-96">
          <span className="line-clamp-4 text-wrap">{post.description}</span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Comments comments={post.comments} />
        <AddNewComment postId={post.id} />
      </CardFooter>
    </Card>
  );
}

export default PostCard;
