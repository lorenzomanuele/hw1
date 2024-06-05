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


