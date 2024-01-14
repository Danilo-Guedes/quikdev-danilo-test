import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginSubmit(e) {
    e.preventDefault();
    alert(`email: ${email} \n password: ${password} \n`);
  }

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("http://localhost:3000/api/user/hello2");
      const data = await resp.json();
      console.log(data);
    };
    getData()
  }, []);
  return (
    <div className="h-full  p-5 m-2 flex items-center justify-center ">
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
        <div className="flex flex-col items-center  md:flex-row mt-10 w-full border rounded-lg overflow-hidden">
          <div className="w-1/2 flex flex-col items-center justify-center">
            {/* <img src="/logos/quikdev.webp"  className="w-full" /> */}
            <img
              src="/logos/logo-quikdev.png"
              className="w-full self-center md:w-96"
            />
            <img src="/images/foto-danilo.jpg" className="w-full md:w-10/12" />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center p-10">
            <div className="flex flex-col border rounded-2xl w-2/3 h-full items-center p-10">
              <span className="text-2xl text-blue-400 font-bold">
                Já tem cadastro? Faça seu login
              </span>
              <form className="flex flex-col mt-5 p-5 w-full">
                <div className="flex flex-col gap-3">
                  <label htmlFor="emailinput" className="text-xl text-gray-600">
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
                  <button
                    onClick={handleLoginSubmit}
                    className="bg-red-500 text-white rounded-lg p-2 mt-5"
                  >
                    Entrar
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;