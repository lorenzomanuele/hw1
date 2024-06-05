function torna_a_pagina_iniziale(event){
    console.log('Torno a index.php');
    event.preventDefault();
    window.location.href = 'index.php'
  }
  
  document.getElementById('profilo_utente').addEventListener('click', torna_a_pagina_iniziale);


//FUNZIONI PER ESTENDERE LE TENDINE DEL FOOTER
document.querySelectorAll('.item-paragraph').forEach(div => {
    div.addEventListener('click', () => {
        const dataInfo = div.getAttribute('data-info');
        estendiRetraiTendina(dataInfo);
    });
});
  
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



function checkName(event) {
    const input = event.currentTarget;
    
    if (formStatus[input.name] = input.value.length > 0) {
        input.parentNode.classList.remove('errorj');
    } else {
        input.parentNode.classList.add('errorj');
    }
}

function checkSurname(event) {
    const input = event.currentTarget;
    
    if (formStatus[input.surname] = input.value.length > 0) {
        input.parentNode.classList.remove('errorj');
    } else {
        input.parentNode.classList.add('errorj');
    }
}

function jsonCheckUsername(json) {
    if (formStatus.username = !json.exists) {
        document.querySelector('.username').classList.remove('errorj');
    } else {
        document.querySelector('.username span').textContent = "Nome utente già utilizzato";
        document.querySelector('.username').classList.add('errorj');
    }
}

function jsonCheckEmail(json) {
    if (formStatus.email = !json.exists) {
        document.querySelector('.email').classList.remove('errorj');
    } else {
        document.querySelector('.email span').textContent = "Email già utilizzata";
        document.querySelector('.email').classList.add('errorj');
    }
}

function fetchResponse(response) {
    if (!response.ok) return null;
    return response.json();
}

function checkUsername(event) {
    const input = document.querySelector('.username input');

    if(!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)) {
        input.parentNode.querySelector('span').textContent = "Sono ammesse lettere, numeri e underscore. Max. 15";
        input.parentNode.classList.add('errorj');
        formStatus.username = false;

    } else {
        fetch("check_username.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonCheckUsername);
    }    
}

function checkEmail(event) {
    const emailInput = document.querySelector('.email input');
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(emailInput.value).toLowerCase())) {
        document.querySelector('.email span').textContent = "Email non valida";
        document.querySelector('.email').classList.add('errorj');
        formStatus.email = false;

    } else {
        fetch("check_email.php?q="+encodeURIComponent(String(emailInput.value).toLowerCase())).then(fetchResponse).then(jsonCheckEmail);
    }
}

function checkPassword(event) {
    const passwordInput = document.querySelector('.password input');
    if (formStatus.password = passwordInput.value.length >= 8) {
        document.querySelector('.password').classList.remove('errorj');
    } else {
        document.querySelector('.password').classList.add('errorj');
    }

}

function checkConfirmPassword(event) {
    const confirmPasswordInput = document.querySelector('.confirm_password input');
    if (formStatus.confirmPassord = confirmPasswordInput.value === document.querySelector('.password input').value) {
        document.querySelector('.confirm_password').classList.remove('errorj');
    } else {
        document.querySelector('.confirm_password').classList.add('errorj');
    }
}



const formStatus = {'upload': true};
document.getElementById('nome_id').addEventListener('blur', checkName);
document.getElementById('cognome_id').addEventListener('blur', checkSurname);
document.getElementById('username_id').addEventListener('blur', checkUsername);
document.getElementById('email_id').addEventListener('blur', checkEmail);
document.getElementById('password_id').addEventListener('blur', checkPassword);
document.getElementById('cnfrm_password_id').addEventListener('blur', checkConfirmPassword);


function torna_a_pagina_iniziale(event){
    console.log('Torno a index.php');
    event.preventDefault();
    window.location.href = 'index.php'
}
  
document.getElementById('profilo_utente').addEventListener('click', torna_a_pagina_iniziale);