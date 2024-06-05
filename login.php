<?php


    include 'auth_1.php';
    include 'dbconfig_1.php';
    if (checkAuth()) {
        header('Location: home.php');
        exit;
    }

    if (!empty($_POST["username"]) && !empty($_POST["password"]) )
    {
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $query = "SELECT * FROM users WHERE username = '".$username."'";

        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $num_rows = mysqli_num_rows($res);

        if ($num_rows > 0) 
        {   
            $row = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $row['password'])) {
                $_SESSION["_agora_username"] = $row['username'];
                $_SESSION["_agora_user_id"] = $row['id'];
                header("Location: home.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        $error = "Username e/o password errati.";
    }
    else if (isset($_POST["username"]) || isset($_POST["password"])) {
        $error = "Inserisci username e password.";
    }
?>


<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ticketone</title>
    <link rel="stylesheet" href="hw1.css">
    <script defer src="login.js"></script>
</head>


<body>
<header>
        <div id="flex-container1">
            <div id="flex-item1">Per info e modalità di rimborso <a class="white">clicca qui</a></div>
        </div>
        <div class="flex-container2">
            <img id="logo" src="file_immagini\logo_ticketone.jpg">
            <div class="elenco">
                <span id="eventi">Eventi</span>
            </div>
            <div class="elenco">
                <span id="localita">Località</span>
            </div>

            <form class="barradiricerca" id="form_MB" autocomplete="off">
                <input type='text' name="search" id="input" class="artisti_eventi" placeholder="Ricerca artisti o eventi">
                <input type='submit' id='submit1' value="Cerca">
            </form>
            <img class="simboli" src="file_immagini\gray_heart.png">
            <img class="simboli" id="profilo_utente" src="file_immagini\profilo_utente.png">
        </div>
        <div id="flex-container3">
            
            <div id="scomparsa1" class="hidden">
                <div class="tendina">
                    <div class="elenco1">
                        <span>Concerti</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Teatro</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Sport</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Mostre e Musei</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Altre manifestazioni</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Eventi internazionali</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Cinema</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Tutti gli eventi</span>
                    </div>
                </div>

            </div>
            <div id="scomparsa2" class="hidden">
                <div class="tendina">
                    <div class="elenco1">
                        <span>Ancona</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Bari</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Bergamo</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Bologna</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Caserta</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Catania</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Firenze</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Forlì</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Genova</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Lucca</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Milano</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Misano</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Monza</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Napoli</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Padova</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Palermo</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Parma</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Pescara</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Reggio Calabria</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Reggio Emilia</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Roma</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Torino</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Trento</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Trieste</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Udine</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Varese</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Venezia</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Verona</span>
                    </div>
                    <div class="stanghetta_elenco"></div>
                    <div class="elenco1">
                        <span>Tutte le località</span>
                    </div>
                </div>

            </div>
        </div>
    </header>
    <section id="main">
        <div id="container-principale">
            <div id="login">
                <span>Log in</span>
            </div>    
            <div id="container-secondario">
                    <form id="accesso" method="post">
                        <div class="credenziale">
                            <label for='username'>Username</label>
                            <input type='text' name='username' <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>
                        </div>
                        <div class="credenziale">
                            <label for='password' class="password1">Password</label>
                            <input type='password' name='password' <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>
                        </div>
                        <input class="bottone_accedi" type='submit' value="ACCEDI">
                        <?php
                            if (isset($error))
                            {
                                echo "<p class='error'>$error</p>";
                            }   
                        ?>
                    </form>
                <div id="container-destra">
                    <span class="scritta_fianco">Accedi con username e password.
                        Per una maggiore sicurezza usa una password adeguata
                        (almeno 8 caratteri incluse lettere - maiuscole e
                        minuscole - numeri e caratteri speciali).
                    </span>
                </div>
            </div>
            <span>Oppure <a class="link_iscriviti" href="signup.php">Iscriviti</a></span>
        </div>
    </section>

    <footer>
        <!-- Link e servizi -->
        <div class="flex-container5">
            <div class="item-paragraph" data-info="group1">
                <span class="title">TicketOne<br /></span>
                <a class="azzurro">Termini e condizioni d'acquisto</a>
                <a class="azzurro">Privacy</a>
                <a class="azzurro">Informativa Cookie</a>
                <a class="azzurro">ADR/ODR - Conciliazione paritetica</a>
                <a class="azzurro">Contatti Business</a>
                <a class="azzurro">Impostazioni Cookie</a>
            </div>
            <div class="item-paragraph" data-info="group2">
                <span class="title">La Società</span>
                <a class="azzurro">Chi siamo</a>
                <a class="azzurro">Eventim Interational</a>
                <a class="azzurro">Lavora con noi</a>
                <a class="azzurro">Comunicati Stampa</a>
                <a class="azzurro">Compliance</a>
                <a class="azzurro">Persone con
                    disabilità</a>
            </div>
            <div class="item-paragraph" data-info="group3">
                <span class="title">Help e contatti</span>
                <a class="azzurro">Contatti Consumatori</a>
                <a class="azzurro">Helpcenter (FAQ)</a>
                <a class="azzurro">Cerca Punti Vendita</a>
                <a class="azzurro">Annulla e Posticipi</a>
                <a class="azzurro">Polizza <em>Biglietto Sicuro</em></a>
                <a class="azzurro">Modalità di pagamento</a>
            </div>
            <div class="item-paragraph" data-info="group4">
                <span class="title">Servizi</span>
                <a class="azzurro">Newsletter</a>
                <a class="azzurro">Gift
                    Voucher</a>
                <a class="azzurro">Cambio nominativo</a>
                <a class="azzurro">Rivendita</a>
                <a class="azzurro">TicketOne Magazine</em></a>
                <a class="azzurro">Apps & Specials</a>
            </div>
            <div class="item-paragraph" data-info="group5">
                <span class="title">B2B</span>
                <a class="azzurro">On line Partners</a>
                <a class="azzurro">Logo TicketOne.it</a>
                <a class="azzurro">Logo Call Center 892.101</a>
                <a class="azzurro">Diventa Punto
                    Vendita</em></a>
                <a class="azzurro">Servizi Business & Gruppi</a>
                <a class="azzurro">Advertising</a>
            </div>
            <div class="item-paragraph" data-info="group6">
                <span class="title">Sport.Ticketone.it</span>
                <a class="azzurro">Domande frequenti (FAQ)</a>
                <a class="azzurro">Servizi post vendita</a>
            </div>
        </div>
        <div class="stanghetta"></div>
        <div class="flex-container5">
            <div class="item-paragraph3">
                <span class="title">Seguici su...<br /></span>
                <div class="item-paragraph2">
                    <img class="icone" src="file_immagini\facebook_icon.png">
                    <img class="icone" src="file_immagini\instagram_icon.png">
                    <img class="icone" src="file_immagini\tiktok_icon.png">
                    <img class="icone" src="file_immagini\twitter_icon.png">
                    <img class="icone" src="file_immagini\linkedin_icon.png">
                    <img class="icone" src="file_immagini\youtube_icon.png">
                </div>
            </div>
            <div class="item-paragraph3">
                <span class="title">Download App<br /></span>
                <div class="item-paragraph2">
                    <img class="icone_stores" src="file_immagini\appstore.png">
                    <img class="icone_stores" src="file_immagini\googleplay.png">
                </div>
            </div>
            <div class="item-paragraph3">
                <span class="title">Call Center TicketOne 892.101<br /></span>
                <img id="icona_numeroverde" src="file_immagini\numeroverde_icon.png">
                <span id="text_paragraph2">Il costo massimo da rete fissa è di € 1/Min (I.V.A. esclusa senza
                    scatto alla risposta). Per scoprire tutti i costi e i dettagli del servizio
                    <span class="azzurro">clicca qui.<br /></span>Lunedì - Venerdì: ore 8-21 Sabato ore 9-17,30
                    Domenica chiuso
                </span>
            </div>
        </div>
        <div id="flex-container6">
            <img id="small_logo" src="file_immagini/logo_small.png">
            <div id="container13">
                <img id="italian_flag" src="file_immagini\bandiera_italia.png">
            </div>
        </div>
    </footer>
</body>

</html>