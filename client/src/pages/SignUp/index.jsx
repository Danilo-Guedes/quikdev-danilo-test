import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "../../utils/routes";
import { createUser } from "../../api/user";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // On success, you can do anything with the returned data
      console.log("User created successfully", data);
    },
    onError: (error) => {
      // On error, you can do anything with the error object
      console.log("Error creating user", error);
    },
  });

  async function handleSingUp(e) {
    e.preventDefault();

    const user = { name, email, password, confirmPassword };

    mutation.mutate(user);
  }
  return (
    <div className="h-full p-2 md:p-5 m-2 flex items-center justify-center ">
      <section className="flex flex-col items-center container">
        <h1 className="text-3xl mt-10">Olá Devs !!</h1>
        <h1 className="text-3xl mt-10 text-center">
          <Typewriter
            words={[
              "Sejam bem vindo ao meu teste para a vaga de fullstack da QuikDev!",
              "Espero que gostem do que vão ver!",
              "Obrigado pela oportunidade!",
            ]}
            cursor
            cursorBlinking
            cursorColor="rgb(96 165 250 / 1)"
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
            loop={true}
          />
        </h1>
        <div className="flex flex-col items-center  lg:flex-row mt-10 w-full border rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <img
              src="/logos/logo-quikdev.png"
              className="w-full self-center md:w-96"
            />
            <img src="/images/foto-danilo.jpg" className="w-full md:w-10/12" />
          </div>
          <div className="w-full   lg:w-1/2 flex flex-col items-center justify-center p-2  xl:p-10 mt-10 md:mt-0">
            <div className="flex flex-col border rounded-2xl w-full lg:w-10/12 xl:w-12/12  h-full items-center p-6 lg:p-10">
              <span className="text-2xl text-blue-400 font-bold text-center">
                Preencha para fazer o seu Cadastro
              </span>
              <form className="flex flex-col mt-5 p-5 w-full">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="nameinput"
                      className="text-xl text-gray-600"
                    >
                      Nome
                    </label>
                    <input
                      className="border rounded-lg p-2 mt-2"
                      type="text"
                      placeholder="Digite..."
                      id="nameinput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="emailinput"
                      className="text-xl text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      className="border rounded-lg p-2 mt-2"
                      type="email"
                      placeholder="Digite..."
                      id="emailinput"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="passwordinput"
                      className="text-xl text-gray-600"
                    >
                      Senha
                    </label>
                    <input
                      className="border rounded-lg p-2 mt-2"
                      type="password"
                      placeholder="Digite..."
                      id="passwordinput"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="confirmpasswordinput"
                      className="text-xl text-gray-600"
                    >
                      Confirme a Senha
                    </label>
                    <input
                      className="border rounded-lg p-2 mt-2"
                      type="password"
                      placeholder="Digite..."
                      id="confirmpasswordinput"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleSingUp}
                    className="bg-red-500 text-white rounded-lg p-2 mt-5 font-bold text-lg"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
              <div className="mt-5">
                <span className="text-gray-600 mr-2">Já tem cadastro?</span>{" "}
                <Link className="underline" to={ROUTES.home}>
                  Faça o Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
