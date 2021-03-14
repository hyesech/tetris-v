// 게임 상수 선언
const COLS = 20; // 세로
const ROWS = 10; // 가로

// 게임 상수 선언
const tetris = document.querySelector("#tetris");
var tetrisData = [];

// 전역 변수 선언
var currentPosition = [0, 4];

const blockData = {
  name: "block",
  color: "blue",
  shape: [
    [1, 1],
    [1, 1],
  ],
};

/*
    주요 함수: INIT, CREATE, DROP
*/

// INIT: 게임 초기화
const init = () => {
  const fragment = document.createDocumentFragment();
  [...Array(COLS).keys()].forEach((cor, i) => {
    const tr = document.createElement("tr");
    fragment.appendChild(tr);

    [...Array(ROWS).keys()].forEach((row, j) => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });

    // 0으로 전체 초기화
    const column = Array(ROWS).fill(0);
    tetrisData.push(column);
  });
  console.log(tetrisData);
  tetris.appendChild(fragment);
};

// CREATE: 블록 생성 + 화면에 그리기
const create = () => {
  console.log("FUNC: CREATE");

  // 블록 데이터 생성
  const block = blockData.shape;
  block.forEach((col, i) => {
    col.forEach((row, j) => {
      tetrisData[i][j + 4] = row;
    });
  });
  console.table(tetrisData);
  // 블록 데이터를 바탕으로 화면에 그리기
  draw();
};

// LOOP: 1초마다 반복
const loop = () => {
  console.log("FUNC: LOOP");
};

/*
    Util 함수: draw
*/
const draw = () => {
  console.log("func: draw");

  //   tetris.children[0].children[4].className = "blue";
  //   tetris.children[0].children[5].className = "blue";
  //   tetris.children[1].children[4].className = "blue";
  //   tetris.children[1].children[5].className = "blue";

  tetrisData.forEach((col, i) => {
    col.forEach((row, j) => {
      if (row === 1) {
        tetris.children[i].children[j].className = "blue";
      } else {
        tetris.children[i].children[j].className = "white";
      }
    });
  });
};

/*
    함수 실행
*/

init();

create();

setInterval(loop, 1000);
