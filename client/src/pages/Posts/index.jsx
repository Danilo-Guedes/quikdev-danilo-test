import PageTemplate from "../../components/shared/PageTemplate";
import AddNewPost from "./components/AddNewPost";
function Posts() {
  return (
    <PageTemplate>
      <div className="max-w-[900px] flex flex-col container self-center border border-border rounded-lg my-20">
        <AddNewPost />
      </div>
      <span>aqui vai o componente de listagem</span>
    </PageTemplate>
  );
}

export default Posts;
