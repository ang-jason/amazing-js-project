

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
//////////////////////////////////////////////////////////////////////////
// Global Variables			//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
let galleryNumber = 3;
let comicNumber = 3;
let currcomicNumber = 1;

const comicMax = 2512
//let url_pass = "https://intro-to-js-playground.vercel.app/api/xkcd-comics/600";

//////////////////////////////////////////////////////////////////////////
// for // for go button			//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// for specify selection of comic number
const bGofield = document.getElementById("go_number_field");
bGofield.style.height = "40px";
bGofield.style.fontSize = "20pt";


// for go button
function goEvent() {
  console.log("Go activated?");
  const bGofield = document.getElementById("go_number_field");

  let goNumber = bGofield.value;
  console.log(goNumber);
  document.querySelector("#result").innerHTML = goNumber;
  return goNumber;
}
const btnGo = document.getElementById("go_number_button");

//btnGo.addEventListener("click", goEvent);
btnGo.addEventListener("click", goEvent);



//////////////////////////////////////////////////////////////////////////
// for fetching of API			//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// for fetching of API
async function fetchComicJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const comic_json = await response.json();
  console.log("Fetch Promise was fulfilled");
  console.log(comic_json);

  return comic_json;
}




//////////////////////////////////////////////////////////////////////////
// to hide loader elements			//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// to hide loader elements
function hide(elements) {
  elements = elements.length ? elements : [elements];
  for (let index = 0; index < elements.length; index++) {
    elements[index].style.display = "none";
  }
}

//////////////////////////////////////////////////////////////////////////
// to show loader elements			//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// to show loader elements
function show(elements, specifiedDisplay) {
  elements = elements.length ? elements : [elements];
  for (let index = 0; index < elements.length; index++) {
    elements[index].style.display = specifiedDisplay || "block";
  }
}





//////////////////////////////////////////////////////////////////////////
// This is base URL		//////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
let urlBase = "https://intro-to-js-playground.vercel.app/api/xkcd-comics/";


async function arrayfetchComicJSON(arrElements){
	arrElements.forEach((element) => {
	console.log(element);
	urltoFetch=urlBase.concat(element)
	return fetchComicJSON(urltoFetch)
	});
};




//////////////////////////////////////////////////////////////////////////
// This is Random function array		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function randomArray(seed_size) {
  let arr = [];
  for (let i = 0; i < seed_size; i++) {
    //1-2512
    arr.push(Math.floor(Math.random() * comicMax) + 1);
  }
  return arr;
}


const onRandomClick = () => {
	
	console.log("from onClickRandom")
	console.log(urlBase);
	ranArray=randomArray(3)
	currcomicNumber=ranArray[0]+1
	console.log("currcomicNumber",currcomicNumber)
	console.log(ranArray)
	fetchedComics=arrayfetchComicJSON(ranArray)
	console.log("FETCHED COMICS",fetchedComics)
};


const btnRand = document.querySelector("#buttonRan");

btnRand.addEventListener("click", ()=> {
	// console.log(url_template);	
	console.log("in event listener")
	onRandomClick()
});



//////////////////////////////////////////////////////////////////////////
// This is Next function array		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function NextArray(seed, seed_size) {
  let arr = [];
  let endNumber;
  for (let i = 0; i < seed_size; i++) {
    arr.push(seed + i);
    endNumber = seed + i;
  }

  return [arr, endNumber];
}


const onNextClick = () => {
	
	console.log("from onClickNext")
	console.log(urlBase);
	nexArray=NextArray(currcomicNumber,3)
	currcomicNumber=nexArray[1]+1;
	console.log(nexArray)
	arrayfetchComicJSON(nexArray[0])
};

//////////////////////////////////////////////////////////////////////////
// This is Prev function array		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function PrevArray(seed, seed_size) {
  let arr = [];
  let startNumber;
  for (let i = seed_size; i > 0; i--) {
		if (i==seed_size)
			startNumber = seed - i;
		//console.log("i", i);
		arr.push(seed - i);
		console.log(seed-i)
		
  }
  return [arr, startNumber];
}

const onPrevClick = () => {
	
	console.log("from onClickPrev")
	console.log(urlBase);
	
	currcomicNumber=currcomicNumber-3
	console.log("currentNumber",currcomicNumber)
	
	preArray=PrevArray(currcomicNumber,3)
	//currcomicNumber=PrevArray[1];
	console.log(preArray)
	arrayfetchComicJSON(preArray[0])
};


const btnPrev = document.querySelector("#buttonPrev");

btnPrev.addEventListener("click", ()=> {
	// console.log(url_template);	
	console.log("in event listener")
	onPrevClick()
})

// for button to fetch API
// for button to fetch API
const btnNext = document.querySelector("#buttonNext");

btnNext.addEventListener("click", ()=> {
	// console.log(url_template);	
	console.log("in event listener")
	onNextClick()
});

/* btn.addEventListener("click", function onButtonClick() {
  console.log(url_pass);
  hide(document.querySelector("#img1"));
  show(document.querySelectorAll(".loader"));

  fetchComicJSON(url_pass).then((comic_json) => {
    //comic_json; // fetched commis
    const img1 = document.querySelector("#img1");
    const desc1 = document.querySelector("#desc1");
    const num1 = document.querySelector("#num1");
    const title1 = document.querySelector("#imgtitle1");

    //const href1 = document.querySelector("img1_href");
    //const href1 = document.getElementById("img1_href").href;

    img1.src = comic_json.img;
    //href1 = toString(comic_json.img);
    desc1.innerHTML = comic_json.transcript;
    num1.innerHTML = comic_json.num;
    title1.innerHTML = comic_json.title;
    show(document.querySelector("#img1"));

    hide(document.querySelectorAll(".loader"));
  });
});
 */



/* //TESTING FOR GALLERY FOREACH LOOP
//TESTING FOR GALLERY FOREACH LOOP
//TESTING FOR GALLERY FOREACH LOOP
let gallery_test = document.querySelectorAll(".gallery")[1];
console.log(gallery_test);
let panelsrc = gallery_test.querySelector("img");

panelsrc.src = "https://www.w3schools.com/css/img_lights.jpg";
console.log(panelsrc);

panelsrc.alt = "this is alt text";
console.log(panelsrc.alt);

let panelsrc3 = gallery_test.querySelector("img").src;

panelsrc3 = "https://www.w3schools.com/css/img_5terre.jpg";
console.log(panelsrc3);

let panelalt = gallery_test.querySelector(".imgdesc");
//const panelsrc = gallery_test.querySelector("img").src;
console.log(panelalt);
panelalt.innerHTML = "https://www.w3schools.com/css/img_lights.jpg";
console.log(panelsrc);
//const panel = document.querySelector(`#${panelId}`);

// let paneldesc = gallery_test.querySelector("#imgdesc");
// console.log(paneldesc);
 */