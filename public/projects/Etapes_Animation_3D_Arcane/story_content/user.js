window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  const timeline_pool = [
"Storyboard",
"Concept Art", 
"Modeling",
"Texturing",
"Rigging",
"Layout",
"Animation",
"Lighting & VFX",
"Compositing"
];

const timeline_tips = [
"Scénario et ébauche de plans",
"Design graphique des personnages, objets et éléments du décor", 
"Création sur le logiciel 3D",
"Application des couleurs sur le logiciel 3D",
"Mise en place des articulations sur le logiciel 3D",
"Positionnement des éléments de la scène 3D",
"Création des keyframes d'animation",
"Ajout d'effets visuels et de lumière",
"Assemblage des éléments sur l'image"
];

const timelineIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8];

sessionStorage.setItem("timeline_pool", JSON.stringify(timeline_pool));
sessionStorage.setItem("timeline_tips", JSON.stringify(timeline_tips));
sessionStorage.setItem("timelineIDs", JSON.stringify(timelineIDs));
sessionStorage.setItem("pickedIDs", JSON.stringify([]));

console.log("Game setup with events: ", timeline_pool);
}

window.Script2 = function()
{
  const player = GetPlayer();
const TXT_Quiz = "TXT_Quiz_Item";
const TXT_Timeline1 = "TXT_Timeline_Item_1";
const TXT_QuizDesc = "TXT_Quiz_Desc";

const timeline_tips = JSON.parse(sessionStorage.getItem("timeline_tips"));
const timeline_pool = JSON.parse(sessionStorage.getItem("timeline_pool"));
let timelineIDs = JSON.parse(sessionStorage.getItem("timelineIDs"));
let pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));

// Pick first timeline item at random in pool
const pickedID = timelineIDs[Math.floor(Math.random() * timelineIDs.length)];
const timelineTxt = timeline_pool[pickedID];
timelineIDs = timelineIDs.filter((value) => value !== pickedID);
pickedIDs = [pickedID];

// Pick a quiz item at random in remaining pool
const quizID = timelineIDs[Math.floor(Math.random() * timelineIDs.length)];
const quizTxt = timeline_pool[quizID];
const quizDescTxt = timeline_tips[quizID];
timelineIDs = timelineIDs.filter((value) => value !== quizID);

// Update session Storage
sessionStorage.setItem("timelineIDs", JSON.stringify(timelineIDs));
sessionStorage.setItem("pickedIDs", JSON.stringify(pickedIDs));
sessionStorage.setItem("quizID", quizID);

// Update SL variables
player.setVar(TXT_Timeline1, timelineTxt);
player.setVar(TXT_Quiz, quizTxt);
player.setVar(TXT_QuizDesc, quizDescTxt);

// Place images at the correct position
const image1 = object('6GvOqErykeW');
const image2 = object('6npnwPXxq8l');
const image3 = object('6ZFNWMwE9go');
const image4 = object('6lRjJve6Hq0');
const image5 = object('5sSAi29VzwI');
const image6 = object('6ESAIl86Aft');
const image7 = object('5w9PRQrRofJ');
const image8 = object('5VXAhapurna');
const image9 = object('6KnIZdApbVH');


const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

images[pickedID].x = 843;
images[pickedID].y = 298;
images[quizID].x = 843;
images[quizID].y = 692;
}

window.Script3 = function()
{
  const leftButton = object('5WpqHY1IWGt');
const rightButton = object('6iYzTbgHadX');

gsap.to(leftButton, {scale: 130, duration: 0.6, repeat: -1, yoyo: true});
gsap.to(rightButton, {scale: 130, duration: 0.6, repeat: -1, yoyo: true, delay: 0.6});
}

window.Script4 = function()
{
  // Update already picked items array
let pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));
const quizID = sessionStorage.getItem("quizID");
const insertAtIndex = sessionStorage.getItem("insertAtIndex");

pickedIDs.splice(insertAtIndex, 0, quizID);

sessionStorage.setItem("pickedIDs", JSON.stringify(pickedIDs));
}

window.Script5 = function()
{
  const player = GetPlayer();
const INT_PositionChoice = "PositionChoice";
const BOOL_GameOver = "GameOver";

const choicePos = player.getVar(INT_PositionChoice);
const pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));
const quizID = sessionStorage.getItem("quizID");
let insertAtIndex = -1;
player.setVar(BOOL_GameOver, true);

if (choicePos === 1 && quizID < pickedIDs[0]){
	insertAtIndex = 0;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 2 && quizID > pickedIDs[0]){
	insertAtIndex = 1;
	player.setVar(BOOL_GameOver, false);
}

sessionStorage.setItem("insertAtIndex", insertAtIndex);
}

window.Script6 = function()
{
  const player = GetPlayer();
const TXT_Quiz = "TXT_Quiz_Item";
const TXT_Timeline1 = "TXT_Timeline_Item_1";
const TXT_Timeline2 = "TXT_Timeline_Item_2";
const TXT_QuizDesc = "TXT_Quiz_Desc";

const timeline_tips = JSON.parse(sessionStorage.getItem("timeline_tips"));
const timeline_pool = JSON.parse(sessionStorage.getItem("timeline_pool"));
let timelineIDs = JSON.parse(sessionStorage.getItem("timelineIDs"));
const pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));

// Pick a quiz item at random in remaining pool
const quizID = timelineIDs[Math.floor(Math.random() * timelineIDs.length)];
const quizTxt = timeline_pool[quizID];
const quizDescTxt = timeline_tips[quizID];
timelineIDs = timelineIDs.filter((value) => value !== quizID);

// Update session Storage
sessionStorage.setItem("timelineIDs", JSON.stringify(timelineIDs));
sessionStorage.setItem("quizID", quizID);

// Update SL variables
player.setVar(TXT_Timeline1, timeline_pool[pickedIDs[0]]);
player.setVar(TXT_Timeline2, timeline_pool[pickedIDs[1]]);
player.setVar(TXT_Quiz, quizTxt);
player.setVar(TXT_QuizDesc, quizDescTxt);

// Place images at the correct position
const image1 = object('6GvOqErykeW');
const image2 = object('6npnwPXxq8l');
const image3 = object('6ZFNWMwE9go');
const image4 = object('6lRjJve6Hq0');
const image5 = object('5sSAi29VzwI');
const image6 = object('6ESAIl86Aft');
const image7 = object('5w9PRQrRofJ');
const image8 = object('5VXAhapurna');
const image9 = object('6KnIZdApbVH');

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

images[pickedIDs[0]].x = 667;
images[pickedIDs[0]].y = 298;
images[pickedIDs[1]].x = 1022;
images[pickedIDs[1]].y = 298;
images[quizID].x = 843;
images[quizID].y = 692;
}

window.Script7 = function()
{
  const player = GetPlayer();
const INT_PositionChoice = "PositionChoice";
const BOOL_GameOver = "GameOver";

const choicePos = player.getVar(INT_PositionChoice);
const pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));
const quizID = sessionStorage.getItem("quizID");
let insertAtIndex = -1;
player.setVar(BOOL_GameOver, true);

if (choicePos === 1 && quizID < pickedIDs[0]) {
	insertAtIndex = 0;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 2 && pickedIDs[0] < quizID && quizID < pickedIDs[1]) {
	insertAtIndex = 1;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 3 && quizID > pickedIDs[1]) {
	insertAtIndex = 2;
	player.setVar(BOOL_GameOver, false);
}

sessionStorage.setItem("insertAtIndex", insertAtIndex);
}

window.Script8 = function()
{
  // Update already picked items array
let pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));
const quizID = sessionStorage.getItem("quizID");
const insertAtIndex = sessionStorage.getItem("insertAtIndex");

pickedIDs.splice(insertAtIndex, 0, quizID);

sessionStorage.setItem("pickedIDs", JSON.stringify(pickedIDs));
}

window.Script9 = function()
{
  const player = GetPlayer();
const TXT_Quiz = "TXT_Quiz_Item";
const TXT_Timeline1 = "TXT_Timeline_Item_1";
const TXT_Timeline2 = "TXT_Timeline_Item_2";
const TXT_Timeline3 = "TXT_Timeline_Item_3";
const TXT_QuizDesc = "TXT_Quiz_Desc";

const timeline_tips = JSON.parse(sessionStorage.getItem("timeline_tips"));
const timeline_pool = JSON.parse(sessionStorage.getItem("timeline_pool"));
let timelineIDs = JSON.parse(sessionStorage.getItem("timelineIDs"));
const pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));

// Pick a quiz item at random in remaining pool
const quizID = timelineIDs[Math.floor(Math.random() * timelineIDs.length)];
const quizTxt = timeline_pool[quizID];
const quizDescTxt = timeline_tips[quizID];
timelineIDs = timelineIDs.filter((value) => value !== quizID);

// Update session Storage
sessionStorage.setItem("timelineIDs", JSON.stringify(timelineIDs));
sessionStorage.setItem("quizID", quizID);

// Update SL variables
player.setVar(TXT_Timeline1, timeline_pool[pickedIDs[0]]);
player.setVar(TXT_Timeline2, timeline_pool[pickedIDs[1]]);
player.setVar(TXT_Timeline3, timeline_pool[pickedIDs[2]]);
player.setVar(TXT_Quiz, quizTxt);
player.setVar(TXT_QuizDesc, quizDescTxt);

// Place images at the correct position
const image1 = object('6GvOqErykeW');
const image2 = object('6npnwPXxq8l');
const image3 = object('6ZFNWMwE9go');
const image4 = object('6lRjJve6Hq0');
const image5 = object('5sSAi29VzwI');
const image6 = object('6ESAIl86Aft');
const image7 = object('5w9PRQrRofJ');
const image8 = object('5VXAhapurna');
const image9 = object('6KnIZdApbVH');

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

images[pickedIDs[0]].x = 489;
images[pickedIDs[0]].y = 298;
images[pickedIDs[1]].x = 843;
images[pickedIDs[1]].y = 298;
images[pickedIDs[2]].x = 1198;
images[pickedIDs[2]].y = 298;
images[quizID].x = 843;
images[quizID].y = 692;
}

window.Script10 = function()
{
  const player = GetPlayer();
const INT_PositionChoice = "PositionChoice";
const BOOL_GameOver = "GameOver";

const choicePos = player.getVar(INT_PositionChoice);
const pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));
const quizID = sessionStorage.getItem("quizID");
let insertAtIndex = -1;
player.setVar(BOOL_GameOver, true);

if (choicePos === 1 && quizID < pickedIDs[0]) {
	insertAtIndex = 0;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 2 && pickedIDs[0] < quizID && quizID < pickedIDs[1]) {
	insertAtIndex = 1;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 3 && pickedIDs[1] < quizID && quizID < pickedIDs[2]) {
	insertAtIndex = 2;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 4 && quizID > pickedIDs[2]) {
	insertAtIndex = 3;
	player.setVar(BOOL_GameOver, false);
}

sessionStorage.setItem("insertAtIndex", insertAtIndex);
}

window.Script11 = function()
{
  // Update already picked items array
let pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));
const quizID = sessionStorage.getItem("quizID");
const insertAtIndex = sessionStorage.getItem("insertAtIndex");

pickedIDs.splice(insertAtIndex, 0, quizID);

sessionStorage.setItem("pickedIDs", JSON.stringify(pickedIDs));
}

window.Script12 = function()
{
  const player = GetPlayer();
const TXT_Quiz = "TXT_Quiz_Item";
const TXT_Timeline1 = "TXT_Timeline_Item_1";
const TXT_Timeline2 = "TXT_Timeline_Item_2";
const TXT_Timeline3 = "TXT_Timeline_Item_3";
const TXT_Timeline4 = "TXT_Timeline_Item_4";
const TXT_QuizDesc = "TXT_Quiz_Desc";

const timeline_tips = JSON.parse(sessionStorage.getItem("timeline_tips"));
const timeline_pool = JSON.parse(sessionStorage.getItem("timeline_pool"));
let timelineIDs = JSON.parse(sessionStorage.getItem("timelineIDs"));
const pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));

// Pick a quiz item at random in remaining pool
const quizID = timelineIDs[Math.floor(Math.random() * timelineIDs.length)];
const quizTxt = timeline_pool[quizID];
const quizDescTxt = timeline_tips[quizID];
timelineIDs = timelineIDs.filter((value) => value !== quizID);

// Update session Storage
sessionStorage.setItem("timelineIDs", JSON.stringify(timelineIDs));
sessionStorage.setItem("quizID", quizID);

// Update SL variables
player.setVar(TXT_Timeline1, timeline_pool[pickedIDs[0]]);
player.setVar(TXT_Timeline2, timeline_pool[pickedIDs[1]]);
player.setVar(TXT_Timeline3, timeline_pool[pickedIDs[2]]);
player.setVar(TXT_Timeline4, timeline_pool[pickedIDs[3]]);
player.setVar(TXT_Quiz, quizTxt);
player.setVar(TXT_QuizDesc, quizDescTxt);

// Place images at the correct position
const image1 = object('6GvOqErykeW');
const image2 = object('6npnwPXxq8l');
const image3 = object('6ZFNWMwE9go');
const image4 = object('6lRjJve6Hq0');
const image5 = object('5sSAi29VzwI');
const image6 = object('6ESAIl86Aft');
const image7 = object('5w9PRQrRofJ');
const image8 = object('5VXAhapurna');
const image9 = object('6KnIZdApbVH');

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

images[pickedIDs[0]].x = 311;
images[pickedIDs[0]].y = 298;
images[pickedIDs[1]].x = 667;
images[pickedIDs[1]].y = 298;
images[pickedIDs[2]].x = 1022;
images[pickedIDs[2]].y = 298;
images[pickedIDs[3]].x = 1375;
images[pickedIDs[3]].y = 298;
images[quizID].x = 843;
images[quizID].y = 692;
}

window.Script13 = function()
{
  const player = GetPlayer();
const INT_PositionChoice = "PositionChoice";
const BOOL_GameOver = "GameOver";

const choicePos = player.getVar(INT_PositionChoice);
const pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));
const quizID = sessionStorage.getItem("quizID");
let insertAtIndex = -1;
player.setVar(BOOL_GameOver, true);

if (choicePos === 1 && quizID < pickedIDs[0]) {
	insertAtIndex = 0;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 2 && pickedIDs[0] < quizID && quizID < pickedIDs[1]) {
	insertAtIndex = 1;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 3 && pickedIDs[1] < quizID && quizID < pickedIDs[2]) {
	insertAtIndex = 2;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 4 && pickedIDs[2] < quizID && quizID < pickedIDs[3]) {
	insertAtIndex = 3;
	player.setVar(BOOL_GameOver, false);
}
else if (choicePos === 5 && quizID > pickedIDs[3]) {
	insertAtIndex = 4;
	player.setVar(BOOL_GameOver, false);
}

sessionStorage.setItem("insertAtIndex", insertAtIndex);
}

window.Script14 = function()
{
  // Update already picked items array
let pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));
const quizID = sessionStorage.getItem("quizID");
const insertAtIndex = sessionStorage.getItem("insertAtIndex");

pickedIDs.splice(insertAtIndex, 0, quizID);

sessionStorage.setItem("pickedIDs", JSON.stringify(pickedIDs));
}

window.Script15 = function()
{
  const player = GetPlayer();
const TXT_Timeline1 = "TXT_Timeline_Item_1";
const TXT_Timeline2 = "TXT_Timeline_Item_2";
const TXT_Timeline3 = "TXT_Timeline_Item_3";
const TXT_Timeline4 = "TXT_Timeline_Item_4";
const TXT_Timeline5 = "TXT_Timeline_Item_5";

const timeline_pool = JSON.parse(sessionStorage.getItem("timeline_pool"));
const pickedIDs = JSON.parse(sessionStorage.getItem("pickedIDs"));

// Update SL variables
player.setVar(TXT_Timeline1, timeline_pool[pickedIDs[0]]);
player.setVar(TXT_Timeline2, timeline_pool[pickedIDs[1]]);
player.setVar(TXT_Timeline3, timeline_pool[pickedIDs[2]]);
player.setVar(TXT_Timeline4, timeline_pool[pickedIDs[3]]);
player.setVar(TXT_Timeline5, timeline_pool[pickedIDs[4]]);

// Place images at the correct position
const image1 = object('6GvOqErykeW');
const image2 = object('6npnwPXxq8l');
const image3 = object('6ZFNWMwE9go');
const image4 = object('6lRjJve6Hq0');
const image5 = object('5sSAi29VzwI');
const image6 = object('6ESAIl86Aft');
const image7 = object('5w9PRQrRofJ');
const image8 = object('5VXAhapurna');
const image9 = object('6KnIZdApbVH');

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

images[pickedIDs[0]].x = 119;
images[pickedIDs[0]].y = 298;
images[pickedIDs[1]].x = 477;
images[pickedIDs[1]].y = 298;
images[pickedIDs[2]].x = 831;
images[pickedIDs[2]].y = 298;
images[pickedIDs[3]].x = 1186;
images[pickedIDs[3]].y = 298;
images[pickedIDs[4]].x = 1541;
images[pickedIDs[4]].y = 298;
}

};
