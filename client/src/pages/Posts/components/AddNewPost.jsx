import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "../../../components/ui/use-toast";
// import { useNavigate } from "react-router";
import { cn } from "../../../utils/style";
import { Input } from "../../../components/ui/input";
import { createPost } from "../../../api/post";
// import { ROUTES } from "../../../utils/routes";
import { XCircleIcon } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import Spinner from "../../../components/shared/Spinner";

const AddNewPost = () => {
  const formRef = useRef(null);

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Obrigatório"),
    description: Yup.string().required("Obrigatório"),
  });

  const [fileSelected, setFileSelected] = useState("");

  const resetAllForm = () => {
    formRef.current.resetForm();
    setFileSelected("");
  };

  //   const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("data: ", data);
      console.log("Post created successfully");

      toast({
        title: "Sucesso!",
        description: `Post criado com sucesso, compartilhe com seus amigos`,
      });

      resetAllForm();

      //   navigate(ROUTES.posts);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error(error);

      toast({
        title: "Opss...",
        description: "Erro ao tentar criar uma postagem, tente mais tarde.",
        variant: "destructive",
      });
      resetAllForm();
    },
  });

  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log({ valuesNoAddNewPost: values });

    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("image", fileSelected);

    mutate(formData);
  };

  const handleSelectFile = (event) => {
    const file = event.target.files[0];
    setFileSelected(file);
  };

  // useEffect(() => {
  //   console.log({ fileSelected });
  // }, [fileSelected]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      innerRef={formRef}
    >
      {() => (
        <Form className="flex flex-col m-5 md:m-12 lg:m-16 gap-3">
          <h1 className="text-xl font-bold text-center mb-8">
            Que tal compartilhar algo com seus amigos?
          </h1>
          <label htmlFor="title">Título:</label>
          <Field
            type="text"
            id="title"
            name="title"
            className="border border-gray-600"
            as={Input}
          />
          <ErrorMessage
            name="title"
            component="div"
            className="text-red-500 text-base font-semibold"
          />

          <label htmlFor="description">Descriçao:</label>
          <Field
            id="description"
            name="description"
            className="border border-gray-600"
            as={Textarea}
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-base font-semibold"
          />

          <label
            htmlFor="image"
            className="group underline mt-5 hover:cursor-pointer w-fit py-5 pr-5"
          >
            Adicione uma imagem
          </label>
          <Field
            type="file"
            id="image"
            name="image"
            onChange={handleSelectFile}
            className="hidden"
          />

          {fileSelected && (
            <div className="relative flex items-center justify-center my-20">
              <img
                src={URL.createObjectURL(fileSelected)}
                alt="Preview"
                className="self-center w-52 h-52 rounded-lg overflow-hidden"
              />
              <button onClick={() => setFileSelected("")}>
                <XCircleIcon className="absolute right-10 top-2" />
              </button>
            </div>
          )}

          <button
            disabled={isPending || !fileSelected}
            type="submit"
            className={cn(
              "bg-red-500 text-white rounded-lg p-2 mt-3 flex items-center justify-center font-bold text-lg",
              (isPending || !fileSelected) && "cursor-not-allowed opacity-60"
            )}
          >
            {isPending ? <Spinner /> : "Criar um Post"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewPost;
