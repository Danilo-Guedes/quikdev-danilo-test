/* eslint-disable react/prop-types */

function Comments({ comments }) {
  return (
    <div className="flex flex-col gap-2 my-5">
      <span className="font-semibold text-gray-600">Comentários ({comments.length})</span>
      {comments?.map((comment) => (
        <div key={comment} className="flex flex-col gap-2 w-full">
          <span className="text-sm">Nome de User</span>
          <span className="p-5 rounded-lg border bg-slate-200 ">{comment}</span>
        </div>
      ))}
    </div>
  );
}

export default Comments;
