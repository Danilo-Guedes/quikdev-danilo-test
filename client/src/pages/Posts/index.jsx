import PageTemplate from "../../components/shared/PageTemplate";
import AddNewPost from "./components/AddNewPost";
import PostListing from "./components/PostListing";
function Posts() {
  return (
    <PageTemplate>
      <div className="max-w-[900px] flex flex-col container self-center border border-border rounded-lg my-20 shadow-2xl">
        <AddNewPost />
      </div>
      <div className="flex flex-col items-center justify-center mt-20">
        <PostListing />
      </div>
    </PageTemplate>
  );
}

export default Posts;
