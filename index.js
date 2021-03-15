// 게임 상수 선언
const COLS = 20; // 세로
const ROWS = 10; // 가로

// 게임 상수 선언
const tetris = document.querySelector("#tetris");
const startPosition = [0, 4];
const blockData = {
  name: "block",
  color: "blue",
  shape: [
    [1, 1],
    [1, 1],
  ],
};

// 전역 변수 선언
var tetrisData = [];
var currentPosition = []; // 변경된다.

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
  tetris.appendChild(fragment);
};

// CREATE: 블록 생성 + 화면에 그리기
const create = () => {
  console.log("FUNC: CREATE");

  // 블록 스폰 위치: 상수값 복사 ? 이부분 필요할까?
  currentPosition = startPosition;

  // 블록 데이터 생성
  const block = blockData.shape;
  block.forEach((col, i) => {
    col.forEach((row, j) => {
      tetrisData[i][j + 4] = row;
    });
  });

  // 블록 데이터를 바탕으로 화면에 그리기
  draw();
};

// LOOP: 1초마다 반복
const loop = () => {
  console.log("FUNC: LOOP");

  // blockData로부터 block 생성
  const block = blockData.shape;

  // 움직이고 있는 Block의 좌표값을 담을 배열
  const movingCells = [];

  // 다음 위치 설정
  const nextPosition = [currentPosition[0] + 1, currentPosition[1]];

  // FLAG: 이동 가능(true), 이동 불가(false)
  let canMove = true;

  // 현재 위치에서 한 칸 아래로 이동
  for (let i = currentPosition[0]; i < currentPosition[0] + block.length; i++) {
    for (
      let j = currentPosition[1];
      j < currentPosition[1] + block.length;
      j++
    ) {
      console.log(i, j);
    }
  }

  // FLAG 상태에 따라 작업 분기
  if (!canMove) {
    console.log("이동불가");

    // 줄 삭제 가능한지 체크: rows가 전부 1인 경우
    checkRows();
    // 다음 위치에 새 블록 생성
    // create();
  } else if (canMove) {
    console.log("이동 가능");

    // 매 loop마다 반복해야 하는 작업
    currentPosition = nextPosition;

    console.log("--------");
    console.log(tetrisData);
    console.log("--------");

    draw();
  }
};

/*
    Util 함수: draw, checkRows
*/
const draw = () => {
  console.log("func: draw");

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

const checkRows = () => {
  console.log("func: check rows");
};

/*
    함수 실행
*/

init();

create();

setInterval(loop, 1000);
