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

function PostCard({ post }) {
  return (
    <Card key={post.id} className="max-w-[600px] flex flex-col  flex-grow-0">
      <CardHeader className="">
        <img
          src={`http://localhost:3000/${post.file_path}`}
          alt="Post Image"
          className="h-96 w-96"
        />
      </CardHeader>
      <CardContent className="p-0 gap-5  mb-2 flex flex-wrap w-96 self-center">
        <CardTitle>
          <span className="line-clamp-2 text-wrap">{post.title}</span>
        </CardTitle>
        <CardDescription className="flex flex-wrap  overflow-auto max-h-96">
          <span className="line-clamp-4 text-wrap">{post.description}</span>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-5">
          <User2Icon />
          <span>{post.user.name}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
