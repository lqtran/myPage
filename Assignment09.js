/* 
ORIGINAL Author: Charlie Sopiep
SRC:http://cpsopiep.github.io/myWebsite/Assignment09.js

As of December 8th, 2015
*/

var pieces = [
  {"letter":"A", "value":1,  "amount":9},
  {"letter":"B", "value":3,  "amount":2},
  {"letter":"C", "value":3,  "amount":2},
  {"letter":"D", "value":2,  "amount":4},
  {"letter":"E", "value":1,  "amount":12},
  {"letter":"F", "value":4,  "amount":2},
  {"letter":"G", "value":2,  "amount":3},
  {"letter":"H", "value":4,  "amount":2},
  {"letter":"I", "value":1,  "amount":9},
  {"letter":"J", "value":8,  "amount":1},
  {"letter":"K", "value":5,  "amount":1},
  {"letter":"L", "value":1,  "amount":4},
  {"letter":"M", "value":3,  "amount":2},
  {"letter":"N", "value":1,  "amount":6},
  {"letter":"O", "value":1,  "amount":8},
  {"letter":"P", "value":3,  "amount":2},
  {"letter":"Q", "value":10, "amount":1},
  {"letter":"R", "value":1,  "amount":6},
  {"letter":"S", "value":1,  "amount":4},
  {"letter":"T", "value":1,  "amount":6},
  {"letter":"U", "value":1,  "amount":4},
  {"letter":"V", "value":4,  "amount":2},
  {"letter":"W", "value":4,  "amount":2},
  {"letter":"X", "value":8,  "amount":1},
  {"letter":"Y", "value":4,  "amount":2},
  {"letter":"Z", "value":10, "amount":1},
  {"letter":"_", "value":0,  "amount":2}
];





var board_slots = new Array(6);




$(document).ready(function() {
    
    GenerateTiles();
    
 $(".test").droppable({drop: tileDropped, out: tileRemoved});

});

function updateScrabbleWord()
{
    var newText = "";

  
    for (i = 0; i < board_slots.length; i++)
    {
        if (board_slots[i] !== undefined && board_slots[i].length > 0)
            newText += (board_slots[i])
    }

    
    $("#word").text(newText);
}


function updateScore()
{
    
    var score = 0;
    var doubleWord = false;




    
    for (i = 0; i < board_slots.length; i++)
    {

        if (board_slots[i] !== undefined && board_slots[i].length > 0)
        
        {
            for (x = 0; x < pieces.length; x++)
            {
                if (pieces[x].letter === board_slots[i])
                  
                    if(i === 3 || i === 6)
                    {
                         score += pieces[x].value;
                        doubleWord = true;
                        
                    }
                    else
                        score += pieces[x].value;
            }
        }
    }

  if(doubleWord === true)
  {
        score *= 2;
    }
    
  
  
    $("#score").text(score);
}
function tileDropped(event, ui)
{
    console.log("tile: " + ui.draggable.attr("id") + " dropped");

    ui.draggable.position(
    {
        my: "center",
        at: "center",
        of: $(this)
    });

   
    board_slots[$(this).attr("id")] = ui.draggable.attr("alt");

    
    updateScore();
    updateScrabbleWord();
}

function tileRemoved(event, ui)
{
    console.log("tile: " + ui.helper.attr("id") + " removed");

    
    if(ui.draggable.attr("id") === board_slots[$(this).attr("id")])
    {
        board_slots[$(this).attr("id")] = "";
    }
    updateScore();
    updateScrabbleWord();
}

function GenerateTiles(){
  var base_url = "images/Scrabble_Tile_";
  var random = 1;
  var piece = "<img class='pieces' id='piece" + i + "' src='"+ base_url + random +".jpg" + "'></img>";
  var char = "";
  
  for(var i = 0; i < 7; i++) {
    var loop = true;
    while(loop === true){
      random = Math.floor(Math.random() * 27);
       if(pieces[random].amount !== 0) {
        loop = false;
        pieces[random].amount--;
      }
    }
    
  
   mytile = base_url + pieces[random].letter;
   var char = mytile.substring(21, 22);
piece = "<img class='pieces' id='" + char + "' src='" + mytile + ".jpg'" +"alt='"+ char +"'></img>";

    

     $("#rack").append(piece);


    $(".pieces").css("left", -5).css("top", -138).css("position", "relative").css("width","85px");
    $(".pieces").draggable({snap: "#Board" ,snapMode: "inner"});
  }
}


