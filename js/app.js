function isEqualS(str1,str2) {
    return str1.toUpperCase() == str2.toUpperCase();
}
function isEqual(str1,str2) {
    return str1 == str2;
}

class Carta {
  constructor(tipo, numero, color) {
    this.tipo = tipo;
    this.numero = numero;
    this.color = color;
  }

  presentarCarta(){
      console.log(`${this.numero} de ${this.tipo} color:
      ${this.color}`);
  }
}
const tiposCartas = [
    ["Picas", "negro"],
    ["Diamantes", "rojo"],
    ["Corazones", "rojo"],
    ["Rombos", "negro "],
  ];

class Naipe {
  constructor() {
    this.naipe = [];
  }

  generarNaipe() {
    
    tiposCartas.forEach(el => {
        for (let i = 1; i <= 13; i++) {
            this.naipe.push(new Carta(el[0],i,el[1]));
        }
    });
  }

  presentarCartas(){
    this.naipe.forEach(el => {
      el.presentarCarta();
    });
  }
}

function ejecutable() {
    // let cartaUno = new Carta();
    const naipe = new Naipe();
    naipe.generarNaipe();
    naipe.presentarCartas();
    // cartaUno.presentarCarta();
}

ejecutable();