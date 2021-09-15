//1-2512


// Math.floor(Math.random() * 10) + 1

//////////////////////////////////////////////////////////////////////////
// This is Next function array		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function NextArray(seed, seedSize) {
  let arr = [];
  let endNumber;

  // additional stuff
  // seed=comicMinMax(seed)
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
    seed < comicMax + comicNumber
  );
  if (comicMax - comicNumber <= seed && seed < comicMax + comicNumber) {
    for (let i = 0; i < parseInt(seedSize); i++) {
      console.log("i", i);
      console.log("stage 1A");
      console.log("seed", parseInt(seed));
      if (parseInt(seed) + i > comicMax) {
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
        arr.push(parseInt(seed) + i);
      }

      endNumber = i;
    }

    return [arr, endNumber];
  }
  console.log("stage 2");
  for (let i = 0; i < seedSize; i++) {
    arr.push(parseInt(seed) + i);
    endNumber = parseInt(seed) + i;
  }

  return [arr, endNumber];
}


console.log(NextArray(5,5))



//////////////////////////////////////////////////////////////////////////
// This is Prev function array		//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function PrevArray(seed, seedSize) {
  let arr = [];
  let startNumber;

  // additional stuff
  if (seed >= comicMax || seed <= 1) {
    // arr.push(1)
    console.log("stage1");
    for (let i = seedSize; i > 0; i--) {
      arr.push(comicMax - i+1);
      console.log(seed - i);
    }
    startNumber = comicMax - seedSize;
    return [arr, startNumber];
  }
  console.log("stage2");
  for (let i = seedSize; i > 0; i--) {
    if (i == seedSize) startNumber = seed - i;
    //console.log("i", i);
    arr.push(seed - i);
    console.log(seed - i);
  }
  return [arr, startNumber];
}