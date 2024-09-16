import React, { useState } from "react";
import AlertNotification from "../components/AlertNotification";
import Loading from "../components/Loading";
import SucessNotification from "../components/SucessNotification";
import style from "./Login.module.css"

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [erro, setErro] = useState({estado: false, mensagem: ""})
    const [loading, setLoading] = useState(false)
    const [sucess, setSucess] = useState({estado: false, mensagem: ""})

    function login(e){
        e.preventDefault()
        if(!email || !password){
            setErro({estado: true, mensagem: "Preencha todos os campos"})
            return;
        }
        try{
            const overlay = document.getElementById("overlay")
            overlay.style.display = "block"
            setLoading(true)
            fetch("https://api-e-commerce-m17f.onrender.com/loginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            }).then((response) => response.json())
            .then((data) => {

                if(data.status != 200){
                    setLoading(false)
                    overlay.style.display = "none"
                    setSucess({estado: false, mensagem: ""})
                    return setErro({estado: true, mensagem: data.message})
                }

                setLoading(false)
                overlay.style.display = "none"
                localStorage.setItem("token", data.token)
                setErro({estado: false, mensagem: ""})
                setSucess({estado: true, mensagem: data.message})
            })
        }catch(error){
            console.error(error)
        }
    }

    function receberDados(dados) {
        setErro(dados);
        setSucess(dados)
    }

  return (
    <section className="sectionFormCL">
      <form autoComplete="off" onSubmit={login} className={style.formLogin}>
        <h1>Login</h1>
        <div className="overlayCL" id="overlay"></div>
        {
            loading &&
            <div className="loadingCL"><Loading/></div>
        }

        {
            erro.estado &&
            <AlertNotification message={erro.mensagem} enviarDados={receberDados}/> 
        }

        {
            sucess.estado &&
            <SucessNotification message={sucess.mensagem} enviarDados={receberDados}/>
        }

        <div className="blocoCL">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="exemplo@email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="blocoCL">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Digite sua senha"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
