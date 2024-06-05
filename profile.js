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



function vai_a_preferiti(event){
    console.log('vado in favorite_songs.php');
    event.preventDefault();
    window.location.href = 'favorite_songs.php'
}
document.getElementById('canzoni_preferite').addEventListener('click', vai_a_preferiti);

function vai_a_cancellazione_profilo(event){
    console.log('vado in cancellazione_profilo.php');
    event.preventDefault();
    window.location.href = 'cancellazione_profilo.php'
}
document.querySelector('.cancella_profilo').addEventListener('click', vai_a_cancellazione_profilo);



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


//FETCH PER MOSTRARE GLI EVENTI NEL CARRELLO
fetchEvents();

function fetchEvents() {
    fetch("eventi_salvati.php").then(fetchResponse).then(fetchEventsJson);
}

function fetchResponse(response) {
if (!response.ok) {return null};
return response.json();
}

function fetchEventsJson(json) {
    console.log("Fetching");
    console.log(json);
    if (!json.length) {
        noResults();
        return;
    }

    const container = document.getElementById('ordini');
    container.innerHTML = '';
    const bottone = document.getElementById('svuota_carrello');
    const button_delete = document.createElement('button');
    button_delete.classList.add('svuota_carrello');
    button_delete.innerHTML = 'Svuota carrello';
    bottone.appendChild(button_delete);
    bottone.addEventListener('click', svuotaCarrello);


    for (let event in json) {
        const card = document.createElement('div');
        card.dataset.id = json[event].content.id;
        card.classList.add('event');
        const events = document.querySelectorAll(".event")
        const eventInfo = document.createElement('div');
        eventInfo.classList.add('eventInfo');
        card.appendChild(eventInfo);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add("infoContainer");
        eventInfo.appendChild(infoContainer);
        const info = document.createElement('div');
        info.classList.add("info");
        infoContainer.appendChild(info);
        const name = document.createElement('strong');
        name.innerHTML = json[event].content.nome;
        info.appendChild(name);
        const artista = document.createElement('h7');
        artista.innerHTML = json[event].content.artista;
        info.appendChild(artista);

        const eliminaForm = document.createElement('div');
        eliminaForm.classList.add("saveForm");
        card.appendChild(eliminaForm);
        const elimina = document.createElement('div');
        elimina.value='';
        elimina.classList.add("delete");
        eliminaForm.appendChild(elimina);
        eliminaForm.addEventListener('click', deleteEvent);

        container.appendChild(card);
    }
}

function noResults() {
    const container = document.getElementById('ordini');
    container.innerHTML = '';
    const bottone = document.getElementById('svuota_carrello');
    bottone.innerHTML = '';
    const nores = document.createElement('div');
    nores.className = "nores";
    nores.textContent = "Carrello vuoto.";
    container.appendChild(nores);
}




//FETCH PER SVUOTARE IL CARRELLO
function svuotaCarrello(event){
    event.preventDefault();

    fetch("svuota_carrello.php", {method: 'post'}).then(dispatchResponse, dispatchError);
}

//FETCH PER ELIMINARE UN EVENTO DAL CARRELLO
function deleteEvent(event){
    console.log("Elimino evento")
    const card = event.currentTarget.closest('.event');
    const formData = new FormData();
    formData.append('id', card.dataset.id);
    fetch("delete_event.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
    event.stopPropagation();
}

function dispatchResponse(response) {
    console.log(response);
    return response.json().then(databaseResponse); 
}
  
function dispatchError(error) { 
    console.log("Errore nella cancellazione del singolo evento");
}

function databaseResponse(json) {
    if (json && json.ok) {
        if (json.action === 'cancella_singolo') {
            const card = document.querySelector(`.event[data-id='${json.id}']`);
            if (card) {
                card.remove();
                console.log("Evento con id: ", json.id + " eliminato correttamente");

                // Se ho eliminato singolarmente l'ultimo evento, lancio noResults()
                if (document.querySelectorAll('.event').length === 0) {
                    noResults();
                }
            }
        } else if (json.action === 'cancella_tutti') {
            document.getElementById('ordini').innerHTML = '';
            console.log("Carrello svuotato correttamente");
            noResults();
        }

    } else {
        dispatchError();
    }
}