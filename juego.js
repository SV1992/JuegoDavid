let turn = true;
let pjGolpeado = "";
let pjAtaca = "";
let pjDefiende = "";
let idImagen = "";
let defensa = [];
let defensaElegida = "";

async function ataque(nombreAtaque) {
  obtenerPjGolpear();
  const progress = document.getElementById(pjGolpeado);
  if (defensa.length == 0) {
    defensa = defensaBot(nombreAtaque, "");
  } else {
    if (turn == false) {
      defensa = defensaBot(nombreAtaque, "");
    }
  }
  let vidaNew = 0;
  girarImagen();
  if (progress.value > 0) {
    vidaNew = progress.value - defensa[0];
  }

  actulizarVida(vidaNew, progress.id);

  let data = [nombreAtaque, defensa[1], vidaNew];
  mostrarMensaje(data);

  setTimeout(async function () {
    if (turn == false) {
      let poderBot = obtenerPoderAleatorio();

      // Llamar a esperarClickDefensaMia para obtener la defensa elegida por el jugador humano
      let defensayo = await esperarClickDefensaMia();
      defensa[1] =defensayo
      defensa = defensaBot(poderBot, defensayo);
      const yo= document.getElementById("pro-vida")
      obtenerPjGolpear();
      girarImagen();
      if (yo.value > 0) {
        vidaNew = yo.value - defensa[0];
      }
      actulizarVida(vidaNew, "pro-vida");
      data = [poderBot, defensayo, vidaNew];
      mostrarMensaje(data);
    }
  }, 1000);

  validarGanador();
}

function realizarProgreso(){
  
}

async function esperarClickDefensaMia() {
  console.log("ELIJA UNA DEFENSA");

  return new Promise((resolve) => {
    function handleClick(event) {
      const elementoClic = event.target;

      if (elementoClic.classList.contains("defensas")) {
        defensaElegida = elementoClic.id;
        resolve(defensaElegida);
      }
    }

    document.addEventListener("click", handleClick, { once: true });
  });
}

function obtenerPjGolpear() {
  if (turn) {
    pjGolpeado = "pro-vidaBot";
    pjAtaca = "Orco";
    pjDefiende = "Humano";
    idImagen = "orco";
  } else {
    pjGolpeado = "pro-vida";
    pjAtaca = "Humano";
    pjDefiende = "Orco";
    idImagen = "paladin";
  }
}

function mostrarMensaje(data) {
  console.log(data);

  const mensaje = document.querySelector(".mensajeGolpes")

  mensaje.innerHTML =""
  mensaje.innerHTML = `El ${pjAtaca} atacó con: ${data[0]} y el ${pjDefiende} se defendió con ${data[1]}.<br> Su vida se redujo a: ${data[2]}`
  
  

  const divAtaque = document.getElementById("ataquesDiv");
  const divDefensa = document.getElementById("defensasDiv");
  if (turn) {
    divAtaque.style.display = "none";
    divDefensa.style.display = "block";
  } else {
    divAtaque.style.display = "block";
    divDefensa.style.display = "none";
  }

  turn = !turn;
}

function defensaBot(nombreAtaque, defensa) {
  let golpe = 0;

  let poderAleatorio = defensa;
  if (poderAleatorio == "") {
    poderAleatorio = obtenerPoderAleatorio();
  }

  if (nombreAtaque == "agua" && poderAleatorio == "agua") {
    golpe = 10;
  } else if (nombreAtaque == "agua" && poderAleatorio == "fuego") {
    golpe = 20;
  } else if (nombreAtaque == "agua" && poderAleatorio == "natural") {
    golpe = 0;
  } else if (nombreAtaque == "fuego" && poderAleatorio == "agua") {
    golpe = 0;
  } else if (nombreAtaque == "fuego" && poderAleatorio == "fuego") {
    golpe = 10;
  } else if (nombreAtaque == "fuego" && poderAleatorio == "natural") {
    golpe = 20;
  } else if (nombreAtaque == "natural" && poderAleatorio == "agua") {
    golpe = 20;
  } else if (nombreAtaque == "natural" && poderAleatorio == "fuego") {
    golpe = 0;
  } else if (nombreAtaque == "natural" && poderAleatorio == "natural") {
    golpe = 10;
  }
  return [golpe, poderAleatorio];
}

function obtenerPoderAleatorio() {
  const ataques = ["agua", "fuego", "natural"];
  const defensaAleatorio = ataques[Math.floor(Math.random() * ataques.length)];
  return defensaAleatorio;
}

function actulizarVida(vida, idProgress) {
  const progress = document.getElementById(idProgress);
  progress.value = vida;

  if (progress.id == "pro-vidaBot") {
    document.getElementById("lbl-vidaBot").innerHTML = vida;
  } else {
    document.getElementById("lbl-vidaYo").innerHTML = vida;
  }
}

function girarImagen() {
  const image = document.getElementById(idImagen);
  image.style.transition = "transform 1s";
  image.style.transform = "rotate(360deg)";

  setTimeout(() => {
    image.style.transition = "";
    image.style.transform = "";
  }, 3000);
}

function validarGanador() {
  if (document.getElementById("pro-vidaBot").value <= 0) {
    alert("HAS DERROTADO AL HUMANO");
  } else if (document.getElementById("pro-vida").value <= 0) {
    alert("EL HUMANO TE HA DERROTADO");
  }
}
