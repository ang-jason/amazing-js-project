

document.getElementById("app").innerHTML = `
<h1>xkcd Comic Reader</h1>
<h4> capstone js project webcomic site</h4>

`

//////////////////////////////////////////////////////////////////////////
// Global Variables			//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

let comicNumber = 3;
let currComicNumber = 1;

const comicMax = 2512
//let urlPass = "https://intro-to-js-playground.vercel.app/api/xkcd-comics/600";

let directionFlag=0;

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
  //console.log("from fetch",comic_json);
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

//////////////////////////////////////////////////////////////////////////
// This fetch API function	//////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// async function arrayfetchComicJSON(arrElements){
	// arrElements.forEach((element) => {
	// console.log(element);
	// urltoFetch=urlBase.concat(element)
	// return fetchComicJSON(urltoFetch)
	// });
// };


//////////////////////////////////////////////////////////////////////////
// for // for go button			//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// for specify selection of comic number
const bGofield = document.getElementById("goNumber");
// bGofield.style.height = "45px";
// bGofield.style.fontSize = "20pt";


// for go button
function goEvent() {
  console.log("Go activated?");
  const bGofield = document.getElementById("goNumber");

  let goNumber = bGofield.value;
  console.log(goNumber);
  // document.querySelector("#result").innerHTML = goNumber;
  if (goNumber<=0)
  {
	alert(`Number invalid, please enter again`);
	return onRandomClick()
  }
  
  
  if (goNumber > comicMax){
	alert(`Number invalid, please enter again (< ${comicMax})`);
	goNumber=comicMax
  }
  currComicNumber=goNumber
  
  return refreshComic(currComicNumber)
  // document.querySelector("#result").innerHTML = goNumber;

}
const btnGo = document.getElementById("goButton");

//btnGo.addEventListener("click", goEvent);
btnGo.addEventListener("click", goEvent);




//////////////////////////////////////////////////////////////////////////
// This is Random function array		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function randomArray(seedSize) {
  let arr = [];
  for (let i = 0; i < seedSize; i++) {
    //1-2512
    arr.push(parseInt(Math.floor(Math.random() * comicMax)) + parseInt(1));
  }
  return arr;
}

//////////////////////////////////////////////////////////////////////////
// This is function setup comic frames on the pageX		//////////////////
//////////////////////////////////////////////////////////////////////////

function comicSetup(indexArray){
	
	// this is take all the "frames" of images on the document
	let gallery = document.querySelectorAll('.flex-child .comic')
	// console.log(gallery)
	// hide the existing img frame and show loader img
	hide(document.querySelectorAll("#img"));
	show(document.querySelectorAll(".loader"));	
	
	for (let i = 0; i < indexArray.length; i++) {
		
		// console.log(i)
		urltoFetch=urlBase.concat(indexArray[i])
		
	
		// fetch url with the index.then show img and hide loader and show data
		fetchComicJSON(urltoFetch).then((daata)=> {
			
		show(gallery[i].querySelector("#img"));
		gallery[i].querySelector("img").src = daata.img
		
		hide(gallery[i].querySelector(".loader"));		
		
		gallery[i].querySelector(".imgtitle").innerHTML = daata.safe_title
		gallery[i].querySelector("#num").innerHTML = daata.num
		gallery[i].querySelector(".imgdesc").innerHTML = daata.alt
		
		//console.log("THIS IS RESULT",gallery[i].querySelector(".imgdesc").innerHTML)

		})
		
		
	}
	
}

//////////////////////////////////////////////////////////////////////////
// function to refresh on page to fill up the comics 		/////////////////
//////////////////////////////////////////////////////////////////////////
function refreshComic(specialSeed=0){
	// this is take all the "frames" of images on the document
	let gallery = document.querySelectorAll('.flex-child .comic')
	console.log("REFRESH area",currComicNumber)
	console.log(gallery.length)
	console.log(gallery[0].querySelector("#num").innerHTML)
	
	let startingSeed=specialSeed
	if (specialSeed==0){
		startingSeed = gallery[0].querySelector("#num").innerHTML
	}
	else{
		startingSeed = specialSeed
	}
	console.log("startingSeed",startingSeed)
	
	refreshArr=NextArray(startingSeed,comicNumber)
	currComicNumber=refreshArr[1]+parseInt(1)
	// let refreshArr=[]

	// for (let i=0 ; i<gallery.length; i++)
	// {
		// refreshArr.push(parseInt(startingSeed)+i)
		// console.log("startingSeed",startingSeed)
	// }
	console.log("refreshArr",refreshArr)
	comicSetup(refreshArr[0]);

	console.log("directionFlag",directionFlag)

	// if (directionFlag=="backward")
	// {
		// currComicNumber = parseInt(currComicNumber) + parseInt(comicNumber)
	// }
	
	// set direction flag	
	directionFlag="forward";



}

const onRandomClick = () => {

	console.log("from onClickRandom")
	//console.log(urlBase);
	ranArray=randomArray(comicNumber)
	currComicNumber=ranArray[0]+parseInt(1)
	console.log("currComicNumber",currComicNumber)
	
	console.log("ranArray",ranArray)


	comicSetup(ranArray);

};


const btnRand = document.querySelector("#buttonRan");

btnRand.addEventListener("click", ()=> {

	console.log("in event listener")
	
	onRandomClick()

});



//////////////////////////////////////////////////////////////////////////
// This is Next function array		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function NextArray(seed, seedSize) {
  let arr = [];
  let endNumber;

  // additional stuff

  console.log("seeed", seed);
  if (seed == 0) {
    seed = 1;
  }
  // additional stuff
  console.log("stage 1");
  console.log(
    "TESTER",
    seed >= comicMax,
    comicMax - comicNumber <= seed,
    seed < parseInt(comicMax) + parseInt(comicNumber)
  );
  if (comicMax - comicNumber <= seed && seed < parseInt(comicMax) + parseInt(comicNumber)) {
    for (let i = 0; i < parseInt(seedSize); i++) {
      console.log("i", i);
      console.log("stage 1A");
      console.log("seed", parseInt(seed));
      if (parseInt(seed) + parseInt(i) > comicMax) {
        console.log("length of arr", arr.length);
        console.log("less arr", comicNumber - arr.length);
        let arrCondloop = comicNumber - arr.length + 1;
        for (let z = 1; z < arrCondloop; z++) {
          console.log("z", z);
          console.log("cond", comicNumber - arr.length + 1);
          arr.push(z);
          console.log("arr", arr);
          endNumber = z;
        }
        return [arr, endNumber];
      } else {
        arr.push(parseInt(seed) + parseInt(i));
      }

      endNumber = i;
    }

    return [arr, endNumber];
  }
  console.log("stage 2");
  for (let i = 0; i < seedSize; i++) {
    arr.push(parseInt(seed) + parseInt(i));
    endNumber = parseInt(seed) + parseInt(i);
  }

  return [arr, endNumber];
}


const onNextClick = () => {
	
	console.log("from onClickNext")
	//console.log(urlBase);

	console.log("currentNumber BEFORE next parseInt",currComicNumber)
	// currComicNumber=parseInt(currComicNumber)+parseInt(comicNumber)
	// console.log("currentNumber AFTER",currComicNumber)
	
	// set direction flag
	// directionFlag="forward";
	console.log("directionFlag",directionFlag)

	if (directionFlag=="backward")
	{
		currComicNumber = parseInt(currComicNumber) + parseInt(comicNumber)
	}
	
	// set direction flag	
	directionFlag="forward";


	
	nexArray=NextArray(parseInt(currComicNumber),comicNumber)
	currComicNumber=nexArray[1]+parseInt(1);
	
	console.log("currentNumber After entry",currComicNumber)
	
	console.log(nexArray)

	comicSetup(nexArray[0]);	
	
	
	

	

};

//////////////////////////////////////////////////////////////////////////
// This is Prev function array		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function PrevArray(seed, seedSize) {
  let arr = [];
  let startNumber;

  if (seed === 0) {
    seed = 1;
  }
  // if seed between 2512 and comicNumber of 1,3,5
  if (seed <= comicNumber) {
    console.log("LESSer zone STAGE");
    let inSeed = comicNumber - seed;
    for (let i = seedSize; i > 0; i--, inSeed -= 1) {
      //console.log("LESSer zone", seed - i);
      if (seed - i < 1) {
        //console.log(comicMax - inSeed);
        arr.push(comicMax - inSeed);
      } else {
        arr.push(seed - i);
      }
      //console.log("ARRRRR", arr);
    }
    startNumber = arr[0]-1;
    return [arr, startNumber];
  }

  // additional stuff more 2512
  if (seed >= comicMax || seed <= 1) {
    // arr.push(1)
    console.log("stage1");
    for (let i = seedSize; i > 0; i--) {
      arr.push(comicMax - i + 1);
    }
    //console.log("arr[0]-1", arr[0] - 1);
    startNumber = arr[0]-1;

    return [arr, startNumber];
  }

  console.log("stage2");
  for (let i = seedSize; i > 0; i--) {
    // if (i == seedSize) startNumber = seed - i;
    //console.log("i", i);
    arr.push(seed - i);
    //console.log(seed - i);
  }
  startNumber = arr[0];
  return [arr, startNumber];
}

const onPrevClick = () => {
	
	console.log("from onClickPrev")
	//console.log(urlBase);
	
	console.log("currentNumber BEFORE1",currComicNumber)
	// currComicNumber=currComicNumber
	// console.log("currentNumber BEFORE2",currComicNumber)
	
	
	// direction flag
	console.log("directionFlag",directionFlag)
	if (directionFlag=="forward")
	{
		currComicNumber = parseInt(currComicNumber) - parseInt(comicNumber)

	}
	
	// direction flag	
	directionFlag="backward"	
	
	
	preArray=PrevArray(currComicNumber,comicNumber)
	currComicNumber=preArray[1];
	// console.log("currentNumber AFTER",currComicNumber)
	console.log(preArray)
	comicSetup(preArray[0]);	
};


const btnPrev = document.querySelector("#buttonPrev");

btnPrev.addEventListener("click", ()=> {
	
	console.log("in event listener")
	onPrevClick()
})

// for button to fetch API
// for button to fetch API
const btnNext = document.querySelector("#buttonNext");

btnNext.addEventListener("click", ()=> {
	
	console.log("in event listener")
	onNextClick()
});

//////////////////////////////////////////////////////////////////////////
// This is Comic number selector button 		//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

const btn1comic = document.querySelector("#btn1comic");
const btn3comic = document.querySelector("#btn3comic");
const btn5comic = document.querySelector("#btn5comic");


//////////////////////////////////////////////////////////////////////////
// This is add Comic function		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function addComic(){
// dynamic add is done.
// Add image tags
	let img = new Image()
	
	img.id = "img";
	
	img.src ="https://www.w3schools.com/css/img_lights.jpg"
	img.setAttribute("alt", "alt text");
	
	
	let testerDoc= document.getElementById('gallery-container')	

	let divFlexChild = document.createElement('div');
	divFlexChild.className = "flex-child";
	
	var divLoader = document.createElement('div');
	divLoader.className = "loader";
	divLoader.style.display="None";
	
	
	
	var divComic = document.createElement('div');
	divComic.className = "comic";

	var divH3 = document.createElement('div');
	divH3.className = "imgtitle";

	var divNum = document.createElement('div');
	// divNum.className = "num";
	divNum.id="num"
	
	var divDesc = document.createElement('div');
	divDesc.className = "imgdesc";
	divDesc.id="desc"

	divComic.appendChild(divLoader)
	divComic.appendChild(img)
	divComic.appendChild(divH3)
	divComic.appendChild(divNum)
	divComic.appendChild(divDesc)
	

	divFlexChild.appendChild(divComic)
	testerDoc.appendChild(divFlexChild)
}





document.addEventListener('click', event => {
  if (event.target == btn1comic || event.target == btn3comic || event.target == btn5comic) {

		const theTargetnumber = event.target.getAttribute("value");
		// console.log(event.getAttribute("value"))
		console.log(theTargetnumber)
		gallery=document.querySelector("#gallery-container")	
		
		console.log(gallery)
	
		console.log(gallery.children[2])		
		
		if (comicNumber==theTargetnumber)
		{
			return
		}
		
		
		if (theTargetnumber==3){
			// do nothing
			
			// if (comicNumber==theTargetnumber)
			// {
				// return
			// }
			
			if (comicNumber< theTargetnumber){
				console.log("smaller")
				for (let i=parseInt(comicNumber); i<theTargetnumber ; i++)
				{
					console.log(i)
					addComic()
				}				
			}	
			else
			{
				console.log("larger")
				for (let i=comicNumber; i>theTargetnumber ; i--)
				{
					console.log(gallery.children[parseInt(i)-1].remove())
				}
			}
			
			
			
			
			comicNumber=theTargetnumber
			
		}
		if (theTargetnumber==1){
			// change the comics to 1
			for (let i=comicNumber; i>theTargetnumber ; i--)
			{
				console.log(i)
	
				console.log(gallery.children[parseInt(i)-1].remove())

				
			}
			comicNumber=theTargetnumber
		}
		if (theTargetnumber==5){
			// change the comics to 5

			for (let i=parseInt(comicNumber)+1; i<=theTargetnumber ; i++)
			{
				console.log(i)
				addComic()
			}
			
			comicNumber=theTargetnumber
			
		}
	

		refreshComic()
		console.log("comicNumber",comicNumber)
  }
})

if (window.addEventListener) {
   // window.addEventListener("load", myFunction, false);
   	console.log("comicNumber on LOAD1",comicNumber)
	onRandomClick()
}
else if (window.attachEvent) {
   // window.attachEvent("onload", myFunction);
   	console.log("comicNumber on LOAD2",comicNumber)
	onRandomClick()
}
else {
   // window.onload = myFunction; //will override previously attached event listeners.
   	console.log("comicNumber on LOAD3",comicNumber)
	onRandomClick()
}



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