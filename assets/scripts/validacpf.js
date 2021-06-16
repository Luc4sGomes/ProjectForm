class ValidaCPF {
  //classe cpf
  constructor(cpfEnviado) {
    //construtor da classe cpf tendo como parametro um cpfenviado
    Object.defineProperty(this, "cpfLimpo", {
      //define as propriedades do objeto cpfLimpo é o parametro do cpf
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ""),
    });
  }

  isSequencia() {
    //verifanco se o cpf é uma sequencia
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
  }

  geraNovoCPF() {
    //gerando um novo cpf
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2); //pegando o cpf sem os 2 ultimos digitos
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

    static geraDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;
    for (let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : "0";
  }

  valida() {
    //criado metodo valida
    if (!this.cpfLimpo) return false; //se nao existir a cpfLimpo retorna falso
    if (typeof this.cpfLimpo !== "string") return false; //verificando se o cpf é valido
    if (this.cpfLimpo.length !== 11) return false; //verificando se o cpf é valido
    if (this.isSequencia()) return false;
    this.geraNovoCPF();
    return this.novoCPF === this.cpfLimpo;
  }
}

let validacpf = new ValidaCPF('070.987.720-03'); //criando um obj cpf
 validacpf = new ValidaCPF('999.999.999-99'); //criando um obj cpf

if (validacpf.valida()) {
  console.log("cpf valido");
} else {
  console.log("cpf invalido");
}
