//constantes

const container = document.querySelector('.board');

const scoreBoard = document.querySelector('.score');

const btnStart = document.querySelector('.btnStart');

//variables

let lastHideout = false; // "dernière cachette" pour éviter le même spawn 2 fois

let gameOver = false; 

let score;


btnStart.addEventListener('click', startGame);

function startGame(){
    
    btnStart.style.display='none';
    boardCreation();
    startZombies();
    
    score = 0;
    scoreBoard.innerHTML = score;
    scoring();
}

function startZombies(){

    let hideout = randomUp();

    // rand de 1 à 3
    let temp = Math.floor(Math.random() * 3) + 1;
    // suivant le rand, pop du zombie ou de lola
    let tempClass = temp > 1 ? 'up': 'up2';

    hideout.classList.add(tempClass);

    const time = Math.round(Math.random()* (1500 - 250)+250);
    
    setTimeout(function(){
        hideout.classList.remove(tempClass);
        
        //condition sur une même ligne donc pas d'accolade
        if(!gameOver)startZombies();}
        ,time);
        
    }



function randomUp(){

    //on crée une variable pour afficher aleatoirement les éléments
    // elle va chercher toutes les div qui ont la classe hideout

    const hideouts = document.querySelectorAll('.hideout');
    
    // constante qui génère un chiffre aléatoire parmis les 9 divs
    
    const idx = Math.floor(Math.random()*hideouts.length);
    
    //si le chiffre rand est le même que précédemment, on relance le rand
    if(hideouts[idx].zombieId === lastHideout){
        return randomUp();
    }

    // on stocke le résultat du point de spawn dans la variable lastHideout 
    lastHideout = hideouts[idx].zombieId;

    //on retourne la valeur obtenue

    return hideouts[idx];
}



function boardCreation(){
    let hideoutCreation = 9;
    container.innerHTML = ' ';
    
    // creation d'une boucle pour la creation des divs qui représentent les cachettes(pas plus de 9)

    for(let x = 0; x < hideoutCreation; x++){
        
        //creer les divs
        let div = document.createElement('div');
        
        //ajout d'une classe à chaque div nouvellement créée

        div.setAttribute('class', 'hideout');
        
        div.zombieId = x;
        // on crée dynamiquement une div avec une classe avec un evenement ( tir ) pour les zombies et lola

        
        //zombies
        let zombie = document.createElement('div');
        zombie.setAttribute('class', 'zombie');
        zombie.onclick = tir;
        // on ajoute la div "zombie" à la div parent qui s'appelle "div"
        div.appendChild(zombie);

        
        
        // lola
        let lola = document.createElement('div');
        lola.setAttribute('class', 'lola');
        lola.onclick = tir2;
        div.appendChild(lola);
        
        

        //wall 
        let wall = document.createElement('div');
        wall.setAttribute('class', 'wall');
        div.appendChild(wall);

        
        // on rattache nos divs créées à la div 'board'
        container.appendChild(div);
    }
}

function scoring(){
    scoreBoard.innerHTML = "Score : " + score;
    
    let message = score >= 10 ? "Bien joué ! Vous avez gagné :)" : "Vous avez perdu, voulez-vous rejouer ?";

    if(score>=10 || score < 0){
        gameOver = true;
        btnStart.style.display='block';

        confirm(message);
        document.location.href = 'index.html';
    }
}


function tir(){
    console.log('tir');
    score ++;
    this.parentNode.classList.remove('up');
    scoring();
}

function tir2(){
    console.log('tir2');
    score = score-5;
    this.parentNode.classList.remove('up2');
    scoring();
}