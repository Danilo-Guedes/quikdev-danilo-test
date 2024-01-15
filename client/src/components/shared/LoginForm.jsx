import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "../../utils/routes";
import { userLogin } from "../../api/auth";
import { useToast } from "../../components/ui/use-toast";
import Spinner from "./Spinner";
import { cn } from "../../utils/style";

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("E-mail inválido").required("Obrigatório"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Obrigatório"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const navigate = useNavigate();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: userLogin,
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

      navigate(ROUTES.posts);
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

      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-col border rounded-2xl w-full lg:w-2/3 h-full items-center p-6 lg:p-10">
      <span className="text-2xl text-blue-400 font-bold text-center">
        Já tem cadastro? Faça seu login
      </span>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col mt-5 p-0 md:p-5 w-full"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-xl text-gray-600">
            Email
          </label>
          <input
            className="border rounded-lg p-2 mt-2"
            placeholder="Digite..."
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>
              <span className="text-red-500">{formik.errors.email}</span>
            </div>
          ) : null}
          <label htmlFor="password" className="text-xl text-gray-600">
            Senha
          </label>
          <input
            className="border rounded-lg p-2 mt-2"
            type="password"
            placeholder="Digite..."
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>
              <span className="text-red-500">{formik.errors.password}</span>
            </div>
          ) : null}
          <button
            disabled={isPending}
            type="submit"
            className={cn(
              "bg-red-500 text-white rounded-lg p-2 mt-5 flex items-center justify-center font-bold text-lg",
              isPending && "cursor-not-allowed opacity-60"
            )}
          >
            {isPending ? <Spinner /> : "Entrar"}
          </button>
        </div>
      </form>
      <div className="mt-5">
        <span className="text-gray-600 mr-2">não tem conta ainda?</span>{" "}
        <Link className="underline" to={ROUTES.signup}>
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
