/* eslint-disable react/prop-types */
import { useState } from "react";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { createComment } from "../../../api/comment";
import { useToast } from "../../../components/ui/use-toast";

function AddNewComment({postId}) {
  const [comment, setComment] = useState("");

  const {toast} = useToast()
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      console.log("data: ", data);
      console.log("Comment created successfully");

      toast({
        title: "Sucesso!",
        description: `Comentário criado com sucesso!!`,
      });

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error(error);

      toast({
        title: "Opss...",
        description: "Erro ao tentar criar um comentário no post, tente mais tarde.",
        variant: "destructive",
      });

      setComment("");
    },
  })

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCancel = () => {
    setComment("");
  };

  const handleSave = () => {
    // Save the comment logic here
    console.log("Comment saved:", comment);

    const data = {
        comment: comment,
        postId: postId
    }

    mutate(data)



    setComment("");
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="comment" className="text-lg">Adicione um comentário:</label>
      <Textarea id="comment" value={comment} onChange={handleCommentChange} />
      <div className="flex flex-row justify-around mt-5">
        <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
        <Button variant="default" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}

export default AddNewComment;
