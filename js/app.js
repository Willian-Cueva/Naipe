function isEqualS(str1, str2) {
  return str1.toUpperCase() == str2.toUpperCase();
}
function isEqual(str1, str2) {
  return str1 == str2;
}

function camiarImagen(id='1_1',src="/assets/images/caraOculta.png"){
  document.getElementById(id).setAttribute('src',src);
}

class Carta {
  constructor(tipo, numero, color) {
    this.tipo = tipo;
    this.numero = numero;
    this.color = color;
    this.estado = false;
    this.urlImg = '/assets/images/caraOculta.png';
  }

  presentarCarta() {
    console.log(
      `${this.numero} de ${this.tipo} color: ${this.color} estado: ${this.estado} urlImg: ${this.urlImg}`
    );
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

  barajarCartas(n = 0) {
    this.naipe.forEach((el, index) => {
      const uno = n == 0 ? index : this.__numeroAleatorio();
      const dos = this.__numeroAleatorio();
      // console.log(uno,dos);
      const aux1 = this.naipe[uno];
      this.naipe[uno] = this.naipe[dos];
      this.naipe[dos] = aux1;
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
  
  intensidadBarajada(i = 1) {
    for (let j = 0; j < i; j++) {
      this.barajarCartas();
    }
  }
  cargarImagenesCartas() {
    const urlI='/assets/images/';
    const tiposCartas = {
      0:["Picas", "negro"],
      1:["Diamantes", "rojo"],
      2:["Corazones", "rojo"],
      3:["Rombos", "negro"],
  };
    let cont = 0;
    this.naipe.forEach((el)=>{
      el.urlImg = `${urlI}${el.numero}${tiposCartas[cont][0]}${tiposCartas[cont][1]}.png`;
      if (++cont>3) {
        cont=0;
      }
    })
  };
}

class Monton {
  constructor() {
    this.cartas = [];
  }

  mostrarCartasMonton() {
    this.cartas.forEach((el) => {
      el.presentarCarta();
    });
  }

  presentarCarta(m=1) {
    this.cartas.forEach((el,index) => {
      if (el.estado) {
        camiarImagen(`${m}_${index+1}`,el.urlImg);
      }
    });
  }

  inserto(carta) {
    this.cartas.push(carta);
    // this.destapo();
  }

  retiro() {
    // this.destapo();
    const retorno = this.cartas[0];
    this.cartas.shift();
    return retorno;
  }

  destapo() {
    this.cartas[0].estado = true;
    return this.cartas[0].numero;
  }

  ordenadas(){
    let numero = this.cartas[0].numero,bandera = true;
    for (let i = 1; i < this.cartas.length; i++) {
      if (this.cartas[i].numero!=numero) {
        bandera = false;
      }
    }
    return bandera;
  }
}

class Juego {
  constructor() {
    this.naipe = new Naipe();
    this.mesa = [];
  }

  resetear(){
    this.iniciarMesa();
  }

  presentarMontones() {
    this.mesa.forEach((el, index) => {
      console.log(index);
      el.mostrarCartasMonton();
    });
  }

  iniciarMesa() {
    this.naipe.generarNaipe();
    this.naipe.cargarImagenesCartas();
    this.naipe.intensidadBarajada(10);
    let cont = 0;
    for (let i = 0; i < 13; i++) {
      const monton = new Monton();
      for (let j = 0; j < 4; j++) {
        monton.cartas.push(this.naipe.naipe[cont++]);
        camiarImagen(`${i+1}_${j+1}`);
      }
      this.mesa.push(monton);
    }
  }
  presentarCarta(){
    this.mesa.forEach((el,index)=>{
      el.presentarCarta(index+1);
    })
  }

  jugar() {
    
    let ant = 13,numero=0,iteraciones=0;
    while (!this.mesa[ant - 1].cartas[0].estado) {
      numero = this.mesa[ant - 1].destapo();
      this.presentarCarta();
      this.mesa[numero - 1].inserto(this.mesa[ant - 1].retiro());
      ant=numero;
      iteraciones++;
    }
    console.log('el juego terminó en '+iteraciones+" iteraciones -------------------------------------------------------------");
    alert('el juego terminó en '+iteraciones+" iteraciones ");
    
  }

  comprobar(){
    let bandera = true;
    this.mesa.forEach(el=>{if (!el.ordenadas()) {
      console.log('si entra xd');
      bandera = false;
    }})
    return bandera;
  }

}

function ejecutable() {
  // const naipe = new Naipe();
  // naipe.generarNaipe();
  // naipe.presentarCartas();
  // // naipe.barajarCartas();
  // naipe.intensidadBarajada(7);
  // console.log("===================================== Cartas Barajadas =====================================");
  // naipe.presentarCartas();
  // console.log(`tamaño del arreglo: ${naipe.naipe.length}`);
  const juego = new Juego();
  juego.iniciarMesa();
  juego.presentarMontones();
  // juego.mesa[0].destapo();
  juego.jugar();
  // juego.mesa[0].inserto(juego.mesa[1].retiro());
  juego.presentarMontones();

  if (juego.comprobar()) {
    console.log('La baraja fué ordenada en su totalidad');
  } else {
    console.log('No se ordenó la baraja');
    
  }
  // camiarImagen();

}

ejecutable();
