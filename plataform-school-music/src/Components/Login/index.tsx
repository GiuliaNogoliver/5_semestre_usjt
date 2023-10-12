import "./Login.css";
import axios from 'axios';

const Login= () => {

  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [loginValido, setLoginValido] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/student');
      const { data } = response;
      const dadosString = JSON.stringify(data);

      // Verificando quantidade de dados 
      const wordToSearch = "email";
      let count = 0;
      let startIndex = 0;

      while (true) {
        const index = dadosString.indexOf(wordToSearch, startIndex);
        if (index === -1) {
          break;
        }
        count++;
        startIndex = index + wordToSearch.length;
      }

      // Verificando se o aluno existe
      
      if (response.status === 200) {
        for (let i = 1; i <= count; i++) {
          const KeyUser = dadosString.split('key":"')[i].split('","data')[0];
          const emailUsuario = dadosString.split('email":"')[i].split('","key')[0];

          if (emailUsuario === email && keyUser === key) {            
            setLoginValido(true);          
            window.location.href = '/Consulta';
            break;                                    
          }
          else {
            setLoginValido(false);
          }    
        }       
      }
      if (!loginValido) {
        console.log('Credenciais inválidas');
      }
          
    } catch (error) {
      // Lidar com erros
      console.error('Ocorreu um erro:', error);
    }  
  }
  
  return ( 
    <>     
    <form onSubmit={handleSubmit}>
    <div class="container py-5 h-100 pt">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                  <div class="text-center">
                    
                    <h4 class="mt-1 mb-5 pb-1">Entre com sua conta Aluno</h4><hr></hr><br></br>
                    
                  </div>
                  <form>                    
                    <div class="form-outline mb-4">
                    <label class="form-label" for="formemail">E-mail</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} id="formemail" class="form-control"
                        placeholder="E-mail" required="required"/>                      
                    </div>  

                    <div class="form-outline mb-4">
                      <label class="form-label" for="formkey">Key</label>
                      <input type="password" value={key} onChange={e => setKey(e.target.value)} id="formkey" class="form-control" placeholder="Key"/>                      
                    </div>

                    <div class="text-center pt-1 mb-5 pb-1">
                      <button type ="submit" onClick={handleSubmit} class="btn btn-dark btn-block fa-lg  mb-4">Entrar</button>

                      {!loginValido && <div class="alert alert-danger" role="alert">
                      Credenciais inválidas. Acesso negado!
                      </div>}               

                      <br></br>
                      <a class="text-muted" href="/Recuperarkey">Esqueceu a senha?</a>
                    </div>

                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2">Ainda não tem uma conta?</p>
                      <a href="/Cadastro"><button type="button" class="btn btn-outline-dark">Criar nova</button></a>
                    </div>                    
                  </form>
                </div>                
              </div>

              <div class="col-lg-6 d-flex align-items-center" id="img">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4" id="image-login">
                  <h4 class="mb-4">Bem-vindo a SONGG</h4>
                  <p class="small mb-0 ">O SONGG consiste em uma ferramenta onde escolas de música podem oferecer seus serviços de ensino. <br></br>
                  Os alunos poderão se cadastrar por meio da plataforma e além disso poderão verificar as escolas mais próximas baseadas na rua 
                  inserida no momento do cadastro. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>     
    </>
    )
  }
export default Login