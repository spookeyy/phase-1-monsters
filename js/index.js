let pageNum = 0;
const monsterMash = document.getElementById("monster-container");

document.addEventListener("DOMContentLoaded", (event) => {
  const forward = document.getElementById("forward");
  const back = document.getElementById("back");

  forward.addEventListener("click", (event) => getMonsters((pageNum += 1)));
  back.addEventListener("click", (event) => getMonsters((pageNum -= 1)));

  const monstorMaker = document.createElement("form");
  const nameMonster = document.createElement("input");
  nameMonster.id = "name";
  nameMonster.placeholder = "name";
  const describeMonster = document.createElement("input");
  describeMonster.id = "description";
  describeMonster.placeholder = "description";
  const ageMonster = document.createElement("input");
  ageMonster.id = "age";
  ageMonster.placeholder = "age";
  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  monstorMaker.append(nameMonster, describeMonster, ageMonster, submitButton);
  document.getElementById("create-monster").append(monstorMaker);

  submitButton.addEventListener("click", makeAMonster);

  getMonsters(pageNum);
});

function makeAMonster(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let description = document.getElementById("description").value;
  monster = { name: name, age: age, description: description };
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(monster),
  })
    .then((res) => res.json())
    .then((res) => showMonster(res));
  // showMonster(monster)
  console.log("I'm a monster!");
  // console.log(monster)
}

function getMonsters(page = pageNum, num = 3) {
  monsterMash.innerText = "";
  fetch(`http://localhost:3000/monsters/?_limit=${num}&_page=${page}`)
    .then((res) => res.json())
    .then((arrMonst) => arrMonst.forEach(showMonster));
  // pageNum += 1
}

function showMonster(monster) {
  // const monsterMash = document.getElementById("monster-container")
  const monsterLair = document.createElement("div");
  const monsterP = document.createElement("p");
  const monsterDesc = document.createElement("p");
  monsterLair.classList.add("lair");
  monsterP.innerText = `${monster.name} (${monster.age})`;
  monsterDesc.innerText = monster.description;
  monsterLair.append(monsterP, monsterDesc);
  monsterMash.prepend(monsterLair);
}
