import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "../../../components/shared/Spinner";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../api/post";
import { useToast } from "../../../components/ui/use-toast";
// import { useNavigate } from "react-router";
import { cn } from "../../../utils/style";
// import { ROUTES } from "../../../utils/routes";
import { XCircleIcon } from "lucide-react";
const AddNewPost = () => {
  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const [fileSelected, setFileSelected] = useState("");

  //   const navigate = useNavigate();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("data: ", data);
      // On success, you can do anything with the returned data
      console.log("User loged in successfully");

      localStorage.setItem("user-token", data.token);
      localStorage.setItem("user-data", JSON.stringify(data.user));
      toast({
        title: "Usuário Logado",
        description: `Bem vindo ao Teste QuikDev, ${data.user.name}`,
      });

      //   navigate(ROUTES.posts);
      alert("aqui invalida a listagem para aparecer o novo post no topo");
    },
    onError: (error) => {
      // On error, you can do anything with the error object
      console.log("Error when tried to login the user");
      console.error(error);

      toast({
        title: "Opss...",
        description: "Erro ao tentar logar, verifique os dados informados",
        variant: "destructive",
      });

      alert("aqui reseta o fomr");
    },
  });

  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log(values);
    mutate(values);
  };

  const handleSelectFile = (event) => {
    const file = event.target.files[0];
    setFileSelected(file);
  };

  useEffect(() => {
    console.log({ fileSelected });
  }, [fileSelected]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="flex flex-col m-20">
          <h1 className="text-xl font-bold text-center mb-16">
            Que tal compartilhar algo com seus amigos?
          </h1>
          <label htmlFor="title">Title:</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage name="title" component="div" />

          <label htmlFor="description">Description:</label>
          <Field as="textarea" id="description" name="description" />
          <ErrorMessage name="description" component="div" />

          <label htmlFor="image">Image:</label>
          <Field
            type="file"
            id="image"
            name="image"
            onChange={handleSelectFile}
          />

          {fileSelected && (
            <div className="relative flex items-center justify-center">
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
            disabled={isPending}
            type="submit"
            className={cn(
              "bg-red-500 text-white rounded-lg p-2 mt-5 flex items-center justify-center font-bold text-lg",
              isPending && "cursor-not-allowed opacity-60"
            )}
          >
            {isPending ? <Spinner /> : "C riar um Post"}
          </button>

          <pre>{JSON.stringify(values)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewPost;
