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

function torna_a_home(event){
    console.log('Torno a home.php');
    event.preventDefault();
    window.location.href = 'home.php'
}
  
document.getElementById('profilo_utente').addEventListener('click', torna_a_home);


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


//FETCH PER MOSTRARE I BRANI PREFERITI
fetchSongs();

function fetchSongs() {
    fetch("restituisci_canzoni_preferite.php").then(fetchResponse).then(fetchSongsJson);
}

function fetchResponse(response) {
if (!response.ok) {return null};
return response.json();
}

function fetchSongsJson(json) {
    console.log("Fetching");
    console.log(json);
    if (!json.length) {
        noResults();
        return;
    }
    const container = document.getElementById('preferiti');
    container.innerHTML = '';


    for (let song in json) {
        const card = document.createElement('div');
        card.dataset.id = json[song].content.id;
        card.classList.add('song');
        const songs = document.querySelectorAll(".song")
        const songInfo = document.createElement('div');
        songInfo.classList.add('songInfo');
        card.appendChild(songInfo);
        const img = document.createElement('img');
        img.classList.add("img_song");
        img.src = json[song].content.image;
        songInfo.appendChild(img);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add("infoContainer");
        songInfo.appendChild(infoContainer);
        const info = document.createElement('div');
        info.classList.add("info");
        infoContainer.appendChild(info);
        const titolo = document.createElement('strong');
        titolo.innerHTML = json[song].content.titolo;
        info.appendChild(titolo);
        const artista = document.createElement('h7');
        artista.innerHTML = json[song].content.artista;
        info.appendChild(artista);

        const eliminaForm = document.createElement('div');
        eliminaForm.classList.add("saveForm");
        card.appendChild(eliminaForm);
        const elimina = document.createElement('div');
        elimina.value='';
        elimina.classList.add("delete");
        eliminaForm.appendChild(elimina);
        eliminaForm.addEventListener('click', deleteFavorite);

        container.appendChild(card);
    }
}

function noResults() {
    const container = document.getElementById('preferiti');
    container.innerHTML = '';
    const nores = document.createElement('div');
    nores.className = "nores";
    nores.textContent = "Nessun elemento tra i preferiti.";
    container.appendChild(nores);
}


//FETCH PER ELIMINARE UN BRANO DAI PREFERITI
function deleteFavorite(event){
    console.log("Elimino canzone")
    const card = event.currentTarget.closest('.song');
    const formData = new FormData();
    formData.append('id', card.dataset.id);
    fetch("delete_song.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
    event.stopPropagation();
}

function dispatchResponse(response) {
    console.log(response);
    return response.json().then(databaseResponse); 
}
  
function dispatchError(error) { 
    console.log("Errore nella cancellazione della canzone");
}

function databaseResponse(json) {
    if (json && json.ok) {
        const card = document.querySelector(`.song[data-id='${json.id}']`);
        if (card) {
            card.remove();
            console.log("Canzone con id: ", json.id + " eliminata correttamente");

            // Se ho eliminato singolarmente l'ultima canzone, lancio noResults()
            if (document.querySelectorAll('.song').length === 0) {
                noResults();
            }
        }
    } else {
        dispatchError();
    }
}
