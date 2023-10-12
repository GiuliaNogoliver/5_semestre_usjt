import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home'
import { Route, Router } from 'react-router-dom'

function App() {
  return (
      <>
        <Router>
          <Navbar />
            <Route path='/' element={<Home />}/>
            <Route path='/Sobre' element={<Sobre />} />
            <Route path='/CadastroEscola' element={<Cadastro_Escola />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/consulta' element={<Consulta />} />
            <Route path='/recuperarsenha' element={<RecuperarSenha />} />
        </Router>
      </>
    )
}

export default App
