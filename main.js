const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


/* 

1 - stampiamo in pagina i post
    -reset della pagina
    -stampa dell'autore e foto profilo
    -stampa del resto del post
2 - formattare la data in formato italiano
3 - al click del tasto "mi piace"
    -incrementa "likes" dell'oggetto
    -salva l'id del post con il proprio like in un 
    array
    3bis -se gia cliccato
        -decrementa il contatore dei like
        -cambia colore del bottone 
4 - in assenza dell'immagine profilo
    -stampare le iniziali del nome profilo e utilizzarle al posto della foto

*/

//array in cui inserisco l'id dei post a cui metto like
const arrayOfLikedPost = [];

//controllo e contatore per il "mi piace"
// let isLike = false;
let totalLike = 0;

//dichiaro il contenitore di tutti i post
const postList = document.getElementById("container");

//funzione che gnera i post//
postListGenerator();

const likeButton = document.getElementsByClassName("js-like-button");
 
//funzione del click sul bottone "mi piace"
function clickOnLike(idPost) {
    //selezione del post
    let controlId = "id-custom" + (idPost + 1);
    let likedPost = document.getElementById(controlId);
    
    //assegno ad una variabile il valore che identificherà l'id del bottone "mi piace"
    let utilitiesForCounter = "like-counter-" + (idPost + 1);
    let likeCounter = document.getElementById(utilitiesForCounter);
    //i like totali vengono letti ogni volta
    totalLike = parseInt(likeCounter.innerHTML);

    //condizione per la rimozione della classe e incremento/decremento dei like
    if(likedPost.classList.contains("like-button--liked")){
        likeButton[idPost].classList.remove("like-button--liked");
        totalLike = parseInt(likeCounter.innerHTML);
        likeCounter.innerHTML = totalLike - 1;
        // isLike = false;
    }else{
        likeButton[idPost].classList.add("like-button--liked");
        likeCounter.innerHTML = totalLike + 1;
        arrayOfLikedPost.push(idPost);
        // isLike = true;
    }
    console.log(arrayOfLikedPost);
};

//funzione che genera le caselle interamente
function postListGenerator() {
    postList.innerHTML = "";
    posts.forEach(post => {

        //converto la data in formato italiano
        let convertDataFormat = new Date (post.created).toLocaleDateString("it-IT");
        let defaultImage = "";

        //condizione per riconoscere gli utenti senza immagine di profilo e gestire la mancanza
        if(!post.author.image){
            let takeName = post.author.name;
            const splitName = takeName.split(" ")
            defaultImage = `<div class="profile-pic-default"><span>${splitName[0].charAt(0)}${splitName[1].charAt(0)}</span></div>`;
            post.author.image = "";
        }


        console.log(defaultImage);


        let postExample = `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${defaultImage}
                        <img class="profile-pic" src="${post.author.image}" alt="${post.author.image}">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${post.author.name}</div>
                        <div class="post-meta__time">${convertDataFormat}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${post.content}</div>
            <div class="post__image">
                <img src="${post.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" id="id-custom${post.id}" href="javascript:void(0)" data-postid="${post.id}" onclick="clickOnLike(${post.id - 1})">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
        `;
        postList.innerHTML += postExample;

    });
};