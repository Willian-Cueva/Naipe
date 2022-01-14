/**
 * cambiar o actiualiza una imagen del html
 * @param {String} id id del documento html
 * @param {String} src direccion del directorio de la imagen de la carta
 */
function camiarImagen(id = "1_1", src = "assets/images/caraOculta.png") {
  document.getElementById(id).setAttribute("src", src);
}
/**
 * Clase carta tipo: [Picas,Trebol,Rombos,Corazones],
 * numero: [1,2,3,...,13]
 * color: rojo,negro
 * estado: true o false > si la carta es oculta = false
 * urlImg: es la direccion de la imagen a la que corresponde la carta
 */
class Carta {
  constructor(tipo, numero, color) {
    this.tipo = tipo;
    this.numero = numero;
    this.color = color;
    this.estado = false;
    this.urlImg = "assets/images/caraOculta.png";
  }
  /**
   * presenta la informacion de la instancia de la clase
   */
  presentarCarta() {
    console.log(
      `${this.numero} de ${this.tipo} color: ${this.color} estado: ${this.estado} urlImg: ${this.urlImg}`
    );
  }
}
/**
 * los tipos de cartas que existen en el naipe
 */
const tiposCartas = [
  ["Picas", "negro"],
  ["Diamantes", "rojo"],
  ["Corazones", "rojo"],
  ["Rombos", "negro "],
];
/**
 * clase Naipe
 * naipe: es un arreglo de cartas
 */
class Naipe {
  constructor() {
    this.naipe = [];
  }
  /**
   *
   * @returns retorna un número aleatoreo comprendido entre el 1 y el 52
   */
  __numeroAleatorio() {
    return Math.floor(Math.random() * (51 + 1));
  }
  /**
   * baraja el naipe n veces
   * @param {Number} n numero de barajadas al naipe
   */
  barajarCartas(n = 0) {
    this.naipe.forEach((el, index) => {
      const uno = n == 0 ? index : this.__numeroAleatorio();
      const dos = this.__numeroAleatorio();
      const aux1 = this.naipe[uno];
      this.naipe[uno] = this.naipe[dos];
      this.naipe[dos] = aux1;
    });
  }
  /**
   * metodo que baraja el naipe, por posicion, al recorrer por el foreach
   * genera un numero aleatorio e intercambia la carta con la posicion obtenida del numero aleatorio
   */
  generarNaipe() {
    tiposCartas.forEach((el) => {
      for (let i = 1; i <= 13; i++) {
        this.naipe.push(new Carta(el[0], i, el[1]));
      }
    });
  }
  /**
   * presenta la informacion de todas las cartas del naipe
   */
  presentarCartas() {
    this.naipe.forEach((el) => {
      el.presentarCarta();
    });
  }
  /**
   * este metodo hace lo mismo que barajar cartas xd
   * @param {Number} i intensidad de la barajacion del naipe
   */
  intensidadBarajada(i = 1) {
    for (let j = 0; j < i; j++) {
      this.barajarCartas();
    }
  }
  /**
   * Este metodo se encarga de asignar todas las cartas de naipe la url de su respectiva imagen
   */
  cargarImagenesCartas() {
    const urlI = "assets/images/";
    const tiposCartas = {
      0: ["Picas", "negro"],
      1: ["Diamantes", "rojo"],
      2: ["Corazones", "rojo"],
      3: ["Rombos", "negro"],
    };
    let cont = 0;
    this.naipe.forEach((el) => {
      el.urlImg = `${urlI}${el.numero}${tiposCartas[cont][0]}${tiposCartas[cont][1]}.png`;
      if (++cont > 3) {
        cont = 0;
      }
    });
  }
}

/**
 * la clase Monton tiene un atributo cartas el cual es un arreglo de cartas en que empieza
 * con un tamaño 4, y que en el juego llega a 5
 */
class Monton {
  constructor() {
    this.cartas = [];
  }
  /**
   * muestra la informacion de las cartas presentes en el monton
   */
  mostrarCartasMonton() {
    this.cartas.forEach((el) => {
      el.presentarCarta();
    });
  }
  /**
   * este metodo presenta la imagen en la vista que le corresponde a la carta que ha sido revelada
   * @param {Number} m es el indice del monto en la intefaz, que comienza con
   * 1 el monto de la parte superior izquierda, recorriendo en sentido horario y finaliza
   * con 13 en el monto del centro
   */
  presentarCarta(m = 1) {
    this.cartas.forEach((el, index) => {
      if (el.estado) {
        camiarImagen(`${m}_${index + 1}`, el.urlImg);
      }
    });
  }
  /**
   * Este metodo sirve para insertar una carta en el monto
   * @param {Carta} carta una carta
   */
  inserto(carta) {
    this.cartas.push(carta);
  }
  /**
   * Retira la primera carta del monto
   * @returns retorna una Carta
   */
  retiro() {
    const retorno = this.cartas[0];
    this.cartas.shift();
    return retorno;
  }
  /**
   * actualiza el estado de la carta a true = que significa que la carta está visible
   * o que no está oculta
   * @returns devuelve una carta
   */
  destapo() {
    this.cartas[0].estado = true;
    return this.cartas[0].numero;
  }
  /**
   * varifica si todas las cartas del monto son del mismo número
   * @returns retorna un true si todas las cartas del monto son del mismo número
   */
  ordenadas() {
    let numero = this.cartas[0].numero,
      bandera = true;
    for (let i = 1; i < this.cartas.length; i++) {
      if (this.cartas[i].numero != numero) {
        bandera = false;
      }
    }
    return bandera;
  }
}
/**
 * la clase juego
 * naipe: es un arreglo de cartas
 * mesa: es un arreglo con los 13 montones
 * numero: es una variable que almacena el numero del monton al cual se va a retirar una carta
 * ant: guarda el numero del monto al cual se destapó la carta
 * iteraciones: guarda el numero de veces que el jugador da clic o las veces que una carta se destapó
 */
class Juego {
  constructor() {
    this.naipe = new Naipe();
    this.mesa = [];
    this.numero = 0;
    this.ant = 13;
    this.iteraciones = 0;
  }
  /**
   *
   * @param {Number} n n=0, actualiza las imagenes segun las posiciones en los montones
   */
  traductor(n = 0) {
    if (n == 0) {
      this.mesa.forEach((monton, index) => {
        monton.cartas.forEach((carta, indexC) => {
          if (carta.estado) {
            camiarImagen(`${index + 1}_${indexC}`, carta.urlImg);
          } else {
            camiarImagen(`${index + 1}_${indexC}`);
          }
        });
      });
    } else {
      this.mesa.forEach((monton, index) => {
        let i = monton.cartas.length;
        let cot = i;
        while((i==3 || i==5) && cot<=5){
          camiarImagen(`${index+1}_${cot}`,"assets/images/sinfondo.png");
          cot++;
        }
      });
    }
  }
  /**
   * resetea los valores del juego
   */
  resetear() {
    this.naipe = new Naipe();
    this.mesa = [];
    this.numero = 0;
    this.ant = 13;
    this.iteraciones = 0;
    this.iniciarMesa();
    this.presentarMontones();
  }
  /**
   * presenta todos los montones ji=unto con los datos de las cartas
   */
  presentarMontones() {
    this.mesa.forEach((el, index) => {
      console.log(index);
      el.mostrarCartasMonton();
    });
  }
  /**
   * inicializa el juego generando el naipe, en orden.
   * luego cargando las urls a las cartas,
   * barajando el naipe con una intensidad de (10 valor x gusto)
   * y cargando las imagenes con caras ocultas a la vista
   */
  iniciarMesa() {
    this.naipe.generarNaipe();
    this.naipe.cargarImagenesCartas();
    this.naipe.intensidadBarajada(10);
    let cont = 0;
    for (let i = 0; i < 13; i++) {
      const monton = new Monton();
      for (let j = 0; j < 4; j++) {
        monton.cartas.push(this.naipe.naipe[cont++]);
        camiarImagen(`${i + 1}_${j}`);
      }
      this.mesa.push(monton);
    }
  }
  /**
   * presenta la informacion de las cartas de todo el naipe
   */
  presentarCarta() {
    this.mesa.forEach((el, index) => {
      el.presentarCarta(index + 1);
    });
  }
  /**
   * realiza la logica del juego
   * el primer turno, destapa la carta del monto central,
   * llevandola al final del monto del numero de la carta destapada
   * y asi sucesivamente
   */
  jugar() {
    if (!this.mesa[this.ant - 1].cartas[0].estado) {
      this.numero = this.mesa[this.ant - 1].destapo();
      this.traductor();

      this.mesa[this.numero - 1].inserto(this.mesa[this.ant - 1].retiro());
      // this.traductor(1);
      this.ant = this.numero;
      this.iteraciones++;
    } else {
      this.mesa.forEach((element) => {
        element.destapo();
      });
      this.traductor();

      if (juego.comprobar()) {
        console.log("La baraja fué ordenada en su totalidad");
      } else {
        console.log("No se ordenó la baraja");
      }
      alert(
        juego.comprobar()
          ? "Ganó - La baraja fué ordenada en su totalidad"
          : "Suerte la próxima vez - No se ordenó la baraja" +
              "el juego terminó en " +
              this.iteraciones +
              " iteraciones -------------------------------------------------------------"
      );
    }
    // alert("el juego terminó en " + iteraciones + " iteraciones ");
  }
  /**
   *
   * @returns retorna true si gano(si los montones se ordenaron con las cartas del mismo número)
   */
  comprobar() {
    let bandera = true;
    this.mesa.forEach((el) => {
      if (!el.ordenadas()) {
        // console.log("si entra xd");
        bandera = false;
      }
    });
    return bandera;
  }
  /**
   * se encarga de que la vista se presente bien
   */
  bugCorreccion() {
    const urlSinFondo = "/assets/images/sinfondo.png";
    this.mesa.forEach((element, index) => {
      // console.log(element);
      if (element.cartas.length == 3) {
        for (let j = 3; j <= 4; j++) {
          camiarImagen(`${index + 1}_${j}`, urlSinFondo);
        }
      } else if (element.cartas.length == 4) {
        camiarImagen(`${index + 1}_4`, urlSinFondo);
      }
    });
  }
}

// function ejecutable() {
const juego = new Juego();
juego.iniciarMesa();
// juego.presentarMontones();

// if (juego.comprobar()) {
//   console.log("La baraja fué ordenada en su totalidad");
// } else {
//   console.log("No se ordenó la baraja");
// }
juego.traductor();
// }
/**
 * resetea el juego
 */
function resetear() {
  juego.resetear();
}
/**
 * se ejecuta cuando el usuario da clik
 */
function jugar() {
  juego.jugar();
  juego.bugCorreccion();
}
