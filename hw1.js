function apriTendina1(event){
    const tendina1 = document.querySelector('#scomparsa1');
    tendina1.classList.remove('hidden');
    chiudiTendina2();
    document.querySelector('#eventi').removeEventListener('click', apriTendina1);
    document.querySelector('#eventi').addEventListener('click', chiudiTendina1);
    event.stopPropagation();
}

function chiudiTendina1(){
    const tendina1 = document.querySelector('#scomparsa1');
    tendina1.classList.add('hidden');
    document.querySelector('#eventi').removeEventListener('click', chiudiTendina1);
    document.querySelector('#eventi').addEventListener('click', apriTendina1);
}

function apriTendina2(event){
    const tendina2 = document.querySelector('#scomparsa2');
    tendina2.classList.remove('hidden');
    chiudiTendina1();
    document.querySelector('#localita').removeEventListener('click', apriTendina2);
    document.querySelector('#localita').addEventListener('click', chiudiTendina2);
    event.stopPropagation();
}

function chiudiTendina2(){
    const tendina2 = document.querySelector('#scomparsa2');
    tendina2.classList.add('hidden');
    document.querySelector('#localita').removeEventListener('click', chiudiTendina2);
    document.querySelector('#localita').addEventListener('click', apriTendina2);
}

document.querySelector('#eventi').addEventListener('click', apriTendina1);

document.querySelector('#localita').addEventListener('click', apriTendina2);

function ingrandisci(event){
    const item = event.target;
    item.classList.add('ingrandimento');
    item.addEventListener('mouseout', rimpicciolisci);
    event.stopPropagation();
}

function rimpicciolisci(event){
    const item = event.target;
    item.classList.remove('ingrandimento');
    item.addEventListener('mouseover', ingrandisci);
    event.stopPropagation();
}

document.querySelector("#first-container1").addEventListener('mouseover', ingrandisci);
document.querySelector("#second-container1").addEventListener('mouseover', ingrandisci);

document.querySelector(".container1").addEventListener('mouseover', ingrandisci);


function apri_tendina_accesso(event){
  console.log('Apro tendina');
  event.preventDefault();
  const tendinadiaccesso = document.getElementById('scomparsa3');
  tendinadiaccesso.classList.remove('hidden');
  document.querySelector('#profilo_utente').removeEventListener('click', apri_tendina_accesso);
  document.querySelector('#profilo_utente').addEventListener('click', chiudi_tendina_accesso);
}

function chiudi_tendina_accesso(event){
  event.preventDefault();
  const tendinadiaccesso = document.querySelector('#scomparsa3');
  tendinadiaccesso.classList.add('hidden');
  document.querySelector('#profilo_utente').removeEventListener('click', chiudi_tendina_accesso);
  document.querySelector('#profilo_utente').addEventListener('click', apri_tendina_accesso);
}

document.getElementById('profilo_utente').addEventListener('click', apri_tendina_accesso);


document.getElementById('form_MB').addEventListener('submit', accediPrima);
document.getElementById('canzoni_preferite').addEventListener('click', accediPrima);


function accediPrima(event){
  event.preventDefault();
  const messaggio_accesso = document.getElementById('accedi_prima');
  messaggio_accesso.classList.remove('hidden');
}

//FUNZIONI PER ESTENDERE LE TENDINE DEL FOOTER
function addMobileEventListeners() {
  document.querySelectorAll('.item-paragraph').forEach(div => {
      div.addEventListener('click', () => {
          const dataInfo = div.getAttribute('data-info');
          estendiRetraiTendina(dataInfo);
      });
  });
}

function estendiRetraiTendina(dataInfo) {
  const paragraph = document.querySelectorAll('.item-paragraph');
  paragraph.forEach(element => {
      if (element.getAttribute('data-info') === dataInfo) {
          const boxes = element.querySelectorAll('.azzurro');
          boxes.forEach(box => {
              if (box.style.display === 'none' || box.style.display === '') {
                  box.style.display = 'block';
              } else {
                  box.style.display = 'none';
              }
          });
      }
  });
}

function verificaMobile() {
  if (window.matchMedia("(max-width: 500px)").matches) {
      addMobileEventListeners();
  }
}

//Quando ricarica o ridimensiona la pagina verifica se è in modalità mobile
window.addEventListener('load', verificaMobile);
window.addEventListener('resize', verificaMobile);



// API Spotify

function jsonSpotify(json) {

    console.log('json ricevuto');
    console.log(json);

    const container = document.getElementById('results2');
    container.innerHTML = '';
    if (!json.items.length) {noResults(); return;}
    
    for (i = 0; i < 10; i++) {
        const card = document.createElement('div');
        card.dataset.id = json.items[i].track.id;
        card.dataset.title = json.items[i].track.name;
        card.dataset.artist = json.items[i].track.artists[0].name;
        card.dataset.image = json.items[i].track.album.images[0].url;
        card.classList.add('track');
        

        const trackInfo = document.createElement('div');
        trackInfo.classList.add('trackInfo');
        card.appendChild(trackInfo);

        const img = document.createElement('img');
        img.classList.add("img_song");
        img.src = json.items[i].track.album.images[0].url;
        trackInfo.appendChild(img);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add("infoContainer");
        trackInfo.appendChild(infoContainer);

        const info = document.createElement('div');
        info.classList.add("info");
        infoContainer.appendChild(info);

        const name = document.createElement('strong');
        name.innerHTML = json.items[i].track.name;
        info.appendChild(name);

        const artist = document.createElement('h7');
        artist.innerHTML = json.items[i].track.artists[0].name;
        info.appendChild(artist);

        container.appendChild(card);
    }
        
}

function noResults() {

  const container = document.getElementById('results2');
  container.innerHTML = '';
  const nores = document.createElement('div');
  nores.className = "loading";
  nores.textContent = "Nessun risultato.";
  container.appendChild(nores);
}

fetch("spotify_api_top_ten.php").then(searchResponseS).then(jsonSpotify);

function searchResponseS(response){
    console.log(response);
    return response.json();
}

function dispatchResponseS(response) {
  console.log(response);
  return response.json().then(databaseResponseS); 
}

function dispatchErrorS(error) { 
  console.log("Errore");
}

function databaseResponseS(json) {
  if (!json.ok) {
      dispatchErrorS();
      return null;
  }
}