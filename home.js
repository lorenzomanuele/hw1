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


function apriContainerMB(event){
    event.stopPropagation();
    console.log('entrato qui');
    const oldbox = document.querySelector('#oldbox');
    oldbox.classList.add('hidden');
    const newbox = document.querySelector('#contenitore1');
    newbox.classList.remove('hidden');   
}

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
    if (window.matchMedia("(max-width: 660px)").matches) {
        addMobileEventListeners();
    }
}



// API MusicBrainz
function searchResponseMB(response){
    console.log(response);
    return response.json();
}

function searchResponseMB(response){
    console.log('Promise ricevuta, restituisco json');
    return response.json();
}

function onError(error){
    console.log('Errore'+error);
}

function search_Musicbrainz(event){
    const inputData=document.querySelector('#input');
    const inputValue=encodeURIComponent(inputData.value);

    phpUrl = 'musicbrainz_api_search.php?q='+inputValue;
    fetch(phpUrl).then(searchResponseMB, onError).then(JsonMB);

    event.preventDefault();

}

document.querySelector("#form_MB").addEventListener("submit", search_Musicbrainz);
document.querySelector("#form_MB").addEventListener("submit", apriContainerMB);


function JsonMB(json){
    console.log('Stampo il json');
    console.log(json);

    const container1 = document.getElementById('results1');
    container1.innerHTML = '';
    container1.className = 'musicbrainz';

    if (!json.count) {
        noResults();
        return;
    }

    let num_results = json.count;
    if(num_results > 12)
    num_results = 12;
    for(let i=0; i<num_results; i++) {
        const card = document.createElement('div');
        card.dataset.id = json.events[i].id;
        card.dataset.nome_evento = json.events[i].name;
        card.dataset.artista = json.events[i].relations[0].artist.name;
        card.classList.add('event');

        const eventInfo = document.createElement('div');
        eventInfo.classList.add('eventInfo');
        card.appendChild(eventInfo);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add("infoContainer");
        eventInfo.appendChild(infoContainer);

        const info = document.createElement('div');
        info.classList.add("info");
        infoContainer.appendChild(info);

        const event_name = document.createElement('strong');
        event_name.innerHTML = json.events[i].name;
        info.appendChild(event_name);

        const artist = document.createElement('h7');
        artist.innerHTML = json.events[i].relations[0].artist.name;
        info.appendChild(artist);
        // verranno stampati solo gli eventi il cui artista è specificato nel json ricevuto

        const ordinaForm = document.createElement('div');
        ordinaForm.classList.add("saveForm");
        card.appendChild(ordinaForm);
        const ordina = document.createElement('div');
        ordina.value='';
        ordina.classList.add("order");
        ordinaForm.appendChild(ordina);
        ordinaForm.addEventListener('click', orderEvent );

        container1.appendChild(card);
    }
}


function noResults() {

    const container = document.getElementById('results1');
    container.innerHTML = '';
    const nores = document.createElement('div');
    nores.className = "loading";
    nores.textContent = "Nessun risultato.";
    container.appendChild(nores);
}

function orderEvent(event){
    console.log("Salvataggio")
    const card = event.currentTarget.parentNode;
    const formData = new FormData();
    formData.append('id', card.dataset.id);
    formData.append('nome', card.dataset.nome_evento);
    formData.append('artista', card.dataset.artista);
    fetch("order_event.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
    event.stopPropagation();
}

function dispatchResponse(response) {

    console.log(response);
    return response.json().then(databaseResponse); 
}
  
function dispatchError(error) { 
    console.log("Errore");
}
  
function databaseResponse(json) {
    if (!json.ok) {
        dispatchError();
        return null;
    }
}

function vai_a_preferiti(event){
    console.log('vado in favorite_songs.php');
    event.preventDefault();
    window.location.href = 'favorite_songs.php'
}
const cuore = document.getElementById('canzoni_preferite');
cuore.addEventListener('click', vai_a_preferiti);




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
        card.dataset.titolo = json.items[i].track.name;
        card.dataset.artista = json.items[i].track.artists[0].name;
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

        const titolo = document.createElement('strong');
        titolo.innerHTML = json.items[i].track.name;
        info.appendChild(titolo);

        const artista = document.createElement('h7');
        artista.innerHTML = json.items[i].track.artists[0].name;
        info.appendChild(artista);

        const favForm = document.createElement('div');
        favForm.classList.add("saveForm");
        card.appendChild(favForm);
        const save2 = document.createElement('div');
        save2.value='';
        save2.classList.add("save");
        favForm.appendChild(save2);
        favForm.addEventListener('click',favSong );

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

function favSong(event){
    console.log("Salvo nei preferiti")
    const card = event.currentTarget.parentNode;
    const formData = new FormData();
    formData.append('id', card.dataset.id);
    formData.append('titolo', card.dataset.titolo);
    formData.append('artista', card.dataset.artista);
    formData.append('image', card.dataset.image);
    fetch("like_song.php", {method: 'post', body: formData}).then(dispatchResponseS, dispatchErrorS);
    event.stopPropagation();
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
