function isEqualS(str1, str2) {
  return str1.toUpperCase() == str2.toUpperCase();
}
function isEqual(str1, str2) {
  return str1 == str2;
}

class Carta {
  constructor(tipo, numero, color) {
    this.tipo = tipo;
    this.numero = numero;
    this.color = color;
  }

  presentarCarta() {
    console.log(`${this.numero} de ${this.tipo} color: ${this.color}`);
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

  __numeroAleatorio() {
    return Math.floor(Math.random() * (51 + 1));
  }

  barajarCartas(n=0){
    this.naipe.forEach((el,index) => {
      const uno = n==0?index:this.__numeroAleatorio();
      const dos = this.__numeroAleatorio();
      // console.log(uno,dos);
      const aux1 = this.naipe[uno];
      this.naipe[uno]=this.naipe[dos];
      this.naipe[dos]=aux1;
    });
  }

  generarNaipe() {
    tiposCartas.forEach((el) => {
      for (let i = 1; i <= 13; i++) {
        this.naipe.push(new Carta(el[0], i, el[1]));
      }
    });
  }

  presentarCartas() {
    this.naipe.forEach((el) => {
      el.presentarCarta();
    });
  }
}

function ejecutable() {
  const naipe = new Naipe();
  naipe.generarNaipe();
  naipe.presentarCartas();
  naipe.barajarCartas();
  console.log("===================================== Cartas Barajadas =====================================");
  naipe.presentarCartas();
  console.log(`tamaño del arreglo: ${naipe.naipe.length}`);
}

ejecutable();
