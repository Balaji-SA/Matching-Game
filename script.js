var images = [{
    "name":"html",
    "src":"images/html.png",
},{
    "name":"angular",
    "src":"images/angular.png",
},{
    "name":"bootstrap",
    "src":"images/bootstrap.png",
},{
    "name":"css",
    "src":"images/css.png",
},{
    "name":"java",
    "src":"images/java.png",
},{
    "name":"javascript",
    "src":"images/javascript.png",
},{
    "name":"nodejs",
    "src":"images/nodejs.png",
},{
    "name":"perl",
    "src":"images/perl.png",
},{
    "name":"php",
    "src":"images/php.png",
},{
    "name":"rails",
    "src":"images/rails.png",
},{
    "name":"react",
    "src":"images/react.png",
},{
    "name":"vue",
    "src":"images/vue.png",
}];
var score = 0;
var attempts = 0;
var open_count = 0;
var first_guess = null;
var second_guess = null;
window.onload=(event)=>{
    var gameboard = document.getElementById("game-board");
    var template = document.getElementsByTagName("template")[0];
    var start_index = getRandom();
    var index = start_index;
    for(var i=1;i<=24;i++)
    {
        var card = template.content.cloneNode(true);
        var main_card = card.querySelector(".card");
        var image_tag = main_card.querySelector("img");
        image_tag.src = images[index].src;
        main_card.setAttribute("name",images[index].name);
        main_card.id = i;
        main_card.setAttribute('flipped','0');
        main_card.setAttribute("onClick",`flip(${i})`);
        gameboard.appendChild(card);
        index = index+1;
        if(index > 11)
            index = 0;
    }
}


function flip(id){
    var card = document.getElementById(id);
    var flipped = card.getAttribute('flipped');
    var card_name = card.getAttribute('name');
    
    if(open_count < 2  && flipped == 0)
    {
        card.classList.add("card","flipped");
        card.setAttribute("flipped",'1');
        open_count = open_count+1;
        if(open_count == 2)
        {
            attempts = attempts+1;
            document.getElementById('attempts').innerText = attempts;
        }
        if(first_guess === null)
            first_guess = card_name;
        else if(second_guess === null)
            second_guess = card_name;
        
        if(first_guess === second_guess)
        {
            removeCards(card_name);
            open_count = 0;
            first_guess = null;
            second_guess = null;
            score = score+1;
            document.getElementById("score_num").innerText = score;
        }

        
    }
        
    else if(flipped == 1)
        {
            card.className = "card";
            card.setAttribute("flipped",'0');
            open_count = open_count-1;
            if(open_count == 0)
            {
                first_guess = null;
                second_guess = null;
            }
            if(card_name === first_guess)
                first_guess = null;
            else if(card_name === second_guess)
                second_guess = null;
        }
    
}

function getRandom()
{
    return Math.floor(Math.random() * (11 - 0) + 0);
}

function removeCards(name){
    setTimeout(()=>{
        var cards = document.getElementsByName(name);
    for(var i=0;i<cards.length;i++)
        cards[i].style.opacity = 0;
    },500);
}