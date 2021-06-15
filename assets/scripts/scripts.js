class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('#form');
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', (event) =>{
            this.handleSubmit(event);
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const camposValidos =this.camposSaoValidos();
    }

    camposSaoValidos(){
        let valid = true;

        for(let campo of this.formulario.querySelectorAll('.validar')){
            if(!campo.value){
                this.criaErro(campo,'');
            }
        }
    }

    criaErro(campo,msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
    }
}

const valida = new ValidaFormulario();