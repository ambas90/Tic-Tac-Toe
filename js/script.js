const fileds = document.querySelector(".fields");
const title = document.querySelector(".title");
const reset = document.querySelector(".resetButton");
const fieldsbuttons = document.querySelectorAll(".fieldButton");
const clickSound = new Audio("sounds/pop.mp3");
let mark = "o";
let gameOn = true;
let markCounter = 0;
let oMarks = [];
let xMarks = [];
const vinMarks = [
  ["A1", "A2", "A3"],
  ["B1", "B2", "B3"],
  ["C1", "C2", "C3"],
  ["A1", "B1", "C1"],
  ["A2", "B2", "C2"],
  ["A3", "B3", "C3"],
  ["A1", "B2", "C3"],
  ["C1", "B2", "A3"],
];

title.textContent = `${mark} zaczyna`;

//wyszukanie klikniętego pola
function fieldFinder(event) {
  if (event.target.nodeName !== "BUTTON" || gameOn === false) {
    return;
  }
  const selectedField = document.querySelector(`#${event.target.id}`);
  //sprawdzenie czy pole jest wolne
  if (selectedField.textContent === "") {
    fieldMarking(selectedField);
  }
}

//zaznaczanie pola
function fieldMarking(selectedField) {
  selectedField.textContent = mark;
  clickSound.play();
  marksSaving(selectedField, mark);
  markChanger();
}

//zapisywanie pozycj x i o do tablicy
function marksSaving(selectedField, mark) {
  markCounter++;
  if (mark === "o") {
    oMarks.push(selectedField.id);
    winCheck(oMarks);
  } else {
    xMarks.push(selectedField.id);
    winCheck(xMarks);
  }
}

//zamienianie x i o
function markChanger() {
  if (mark === "o") {
    mark = "x";
  } else {
    mark = "o";
  }
}

//sprawdzanie 3 symboli w jednej lini
function winCheck(marks) {
  if (marks.length < 3) {
    return;
  }
  for (const vinLine of vinMarks) {
    if (arrCompare(vinLine, marks)) {
      gameEnd(vinLine);
      return;
    }
    if (markCounter === 9) {
      gameEnd("remis");
    }
  }
}

//porównywanie 2 tablic
function arrCompare(arr1, arr2) {
  //arr1 - tablica wzorcowa, arr2 tablica do sprawdzenia
  for (const value of arr1) {
    if (!arr2.includes(value)) {
      return;
    }
  }
  return true;
}

//zaznaczenie wygranej lini i wyswietlenie wyniku
function gameEnd(lineToMark) {
  if (lineToMark === "remis") {
    title.textContent = `Remis!`;
    title.style.color = "red";
    return;
  }
  title.textContent = `${mark} wygrało!`;
  title.style.color = "red";
  for (value of lineToMark) {
    const fieldToMark = document.querySelector(`#${value}`);
    fieldToMark.style.backgroundColor = "red";
  }
  gameOn = false;
}

//resetowanie gry

function gameReset() {
  gameOn = true;
  markCounter = 0;
  oMarks = [];
  xMarks = [];
  console.log(fieldsbuttons);
  fieldsbuttons.forEach((element) => {
    element.textContent = "";
    element.style.backgroundColor = "#127369";
  });
  title.textContent = `${mark} zaczyna`;
  title.style.color = "black";
}

fileds.addEventListener("click", fieldFinder);
reset.addEventListener("click", gameReset);
