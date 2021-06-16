class ValidaFormulario {
  //criando a classse valida formulario
  constructor() {
    this.formulario = document.querySelector("#form"); //pegando o form pelo id
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener("submit", (event) => {
      //chamando uma arrow para n perder o this da function
      this.handleSubmit(event);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const senhasValidas = this.senhasSaoValidas();
    const camposSaoValidos = this.camposSaoValidos();

    if(camposSaoValidos && senhasValidas){
        alert('Formulario enviado');
        this.formulario.submit();
    }
  }

  senhasSaoValidas(){
      let valid = true;

      const senha = this.formulario.querySelector('.senha');
      const repetirSenha = this.formulario.querySelector('.repetir-senha');

      if(senha.value !== repetirSenha.value){
          valid = false;
          this.criaErro(senha,'Campos senhas e repetir senhas precisam ser iguais');
          this.criaErro(repetirSenha,'Campos senhas e repetir senhas precisam ser iguais');
      }

      if(senha.value.length < 6 || senha.value.length > 12){
          valid = false;
          this.criaErro('senha precisa estar entre 6 e 12 caracteres');
      }
  }

  camposSaoValidos() {
    //validando os campos
    let valid = true; //flag

    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;

      if (!campo.value) {
        this.criaErro(campo, `campo "${label}" nao pode estar em branco`);
        valid = false;
      }

      if (campo.classList.contains("cpf")) {
        if (!this.validaCPF(campo)) valid = false;
      }
      if (campo.classList.contains("usuario")) {
        if (!this.ValidaUsuario(campo)) valid = false;
      }
    }

    return valid;
    
  }

  ValidaUsuario(campo){
      const usuario = campo.value;
      let valid = true;
      if(usuario.length >12 || usuario.length < 3){
          this.criaErro(campo,'usuario precisa ter entre 3 e 12 caracteres');
      }

      if(!usuario.match(/[/^a-zA-Z0-9]+/g)){
          this.criaErro(campo,'Nome de usuario precisa conter apenas letras ou numeros');
      }


      return true;
  }

  validaCPF(campo) {
      const cpf = new ValidaCPF(campo.value);

      if(!cpf.valida()){
        this.criaErro(campo,'CPF invalido');
        return false;
      }

      return true;
  }

  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}

const valida = new ValidaFormulario();
