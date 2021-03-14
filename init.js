// 게임 상수 선언
const COLS = 20; // 세로
const ROWS = 10; // 가로

// 게임 전역 변수 선언
var tetris = document.querySelector("#tetris");
var tetrisData = [];

var block = {
  name: "block",
  shape: [
    [1, 1],
    [1, 1],
  ],
};

// INIT: 게임 초기화
const init = () => {
  const fragment = document.createDocumentFragment();
  [...Array(COLS).keys()].forEach(() => {
    const tr = document.createElement("tr");
    fragment.appendChild(tr);

    [...Array(ROWS).keys()].forEach(() => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });

    // 0으로 초기화
    const column = Array(COLS).fill(0);
    tetrisData.push(column);
  });

  tetris.appendChild(fragment);
};

// CREATE: 블록 생성 + 화면에 그리기
const create = () => {
  console.log("FUNC: CREATE");
};

// DROP: 1초마다 반복
const drop = () => {
  console.log("FUNC: DROP");
};

/*
    함수 실행
*/

init();

create();

setInterval(drop, 1000);
