const fileds = document.querySelector(".fields");
const title = document.querySelector(".title");
fileds.addEventListener("click", fieldFinder);
let mark = "o";
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

//wyszukanie klikniętego pola
function fieldFinder(event) {
  if (event.target.nodeName !== "BUTTON") {
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
  marksSaving(selectedField, mark);
  markChanger();
}

//zapisywanie pozycj x i o
function marksSaving(selectedField, mark) {
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
  console.log("sprawdzam zaznaczone na planszy", marks);
  for (const vinLine of vinMarks) {
    if (arrCompare(vinLine, marks)) {
      gameEnd(vinLine);
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

function gameEnd(LineToMark) {
  console.log(`wygrały ${mark}`);
  title.textContent = `${mark} wygrało!`;
  title.style.color = "red";
  for (value of LineToMark) {
    const fieldToMark = document.querySelector(`#${value}`);
    fieldToMark.style.backgroundColor = "red";
  }
}
