// 게임 상수 선언
const ROWS = 10; // 가로
const COLS = 20; // 세로

// 게임 상수 선언
const tetris = document.querySelector("#tetris");
const cursorLeft = document.querySelector("#left");
const cursorRight = document.querySelector("#right");
const cursorDown = document.querySelector("#down");
const blockData = {
  name: "block",
  shape: [
    [1, 1],
    [1, 1],
  ],
};

// 전역 변수 선언
let gameBoard = [];
let currentBlock = [];
let currentPosition = []; // 변경된다.

/*
    주요 함수: INIT(), CREATE(), DROP()
*/

// INIT
const init = () => {
  const fragment = document.createDocumentFragment();
  [...Array(COLS).keys()].forEach(() => {
    const tr = document.createElement("tr");
    fragment.appendChild(tr);

    [...Array(ROWS).keys()].forEach(() => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });

    // 0으로 전체 초기화
    const column = Array(ROWS).fill(0);
    gameBoard.push(column);
  });
  tetris.appendChild(fragment);
};

// CREATE
const create = () => {
  // 블록 스폰 위치: 가상의 맨 윗줄이 있는 것처럼 연산
  currentPosition = [0, 4];

  // 블록 데이터 생성: 맨 윗줄을 삭제하고 연산한다.
  currentBlock = blockData.shape;

  // 게임 종료 판정 FLAG
  let isGameOver = false;

  // 게임 종료 판정
  currentBlock.forEach((tr, i) => {
    tr.forEach((td, j) => {
      if (gameBoard[i][j + 3]) {
        isGameOver = true;
      }
    });
  });

  // 화면 그리기
  currentBlock.forEach((tr, i) => {
    tr.forEach((td, j) => {
      gameBoard[i][j + 4] = td;
    });
  });

  // FLAG
  if (isGameOver) {
    clearInterval(game);
    alert("GAME OVER");
    window.location.reload();
  } else {
    draw();
  }
};

// LOOP: 1초마다 반복하며 블록을 한 칸 아래로 이동
const loop = () => {
  // 다음 위치 설정
  const nextPosition = [currentPosition[0] + 1, currentPosition[1]];

  // 움직이고 있는 Block의 좌표값을 담을 배열
  const movingBlocks = [];

  // FLAG: 기본값 true(이동 가능)
  let canMove = true;

  // block 생성
  let block = currentBlock;

  // 현재 위치에서 한 칸 아래를 탐색
  for (let i = currentPosition[0]; i < currentPosition[0] + block.length; i++) {
    if (i < 0 || i >= 20) continue; // 탐색하는 tr의 범위를 0-19로 한정
    for (
      let j = currentPosition[1];
      j < currentPosition[1] + block.length;
      j++
    ) {
      if (gameBoard[i][j] === 1) {
        // 움직일 수 있는 Block인 경우
        movingBlocks.push([i, j]);
        if (gameBoard[i + 1] === undefined || gameBoard[i + 1][j] === 2) {
          // 최하단에 도달한 경우 || 아래에 값이 2인 block이 있는 경우
          canMove = false;
        }
      }
    }
  }

  // FLAG 상태에 따라 작업 분기
  if (canMove) {
    // gameBoard 배열에 현재 블록 위치 업데이트
    for (let i = gameBoard.length - 1; i >= 0; i--) {
      const tr = gameBoard[i];
      tr.forEach((td, j) => {
        if (td === 1 && gameBoard[i + 1] && gameBoard[i + 1][j] !== 2) {
          gameBoard[i + 1][j] = td;
          gameBoard[i][j] = 0;
        }
      });
    }
    // 매 loop마다 반복해야 하는 작업
    currentPosition = nextPosition;
    draw();

    // Space 구현
    return true;
  } else if (!canMove) {
    movingBlocks.forEach((cell) => {
      gameBoard[cell[0]][cell[1]] = 2;
    });

    // 삭제 가능한 줄 체크
    checkLines();
    // 다음 위치에 새 블록 생성
    create();

    // Space 구현
    return false;
  }
};

/*
    UTIL 함수: draw, checkLines
*/
const draw = () => {
  gameBoard.forEach((tr, i) => {
    tr.forEach((td, j) => {
      if (td === 0) {
        tetris.children[i].children[j].className = "white";
      } else if (td === 1) {
        tetris.children[i].children[j].className = "blue";
      } else if (td === 2) {
        tetris.children[i].children[j].className = "grey";
      }
    });
  });
};

const checkLines = () => {
  // 완성된 줄(Line)의 index 값을 담을 배열
  const completeLines = [];

  // 모든 칸이 채워져 있는 경우 index 값을 completeLines 배열에 push
  gameBoard.forEach((tr, i) => {
    let lineCount = 0;
    tr.forEach((td, j) => {
      if (td === 2) {
        lineCount++;
      }
    });
    if (lineCount === 10) {
      completeLines.push(i);
    }
  });

  const completeLineNum = completeLines.length;
  // completeLines에 담긴 값을 index로 갖는 gameBoard 삭제
  gameBoard = gameBoard.filter((tr, i) => !completeLines.includes(i));

  // gameBoard 배열의 앞쪽에 새 배열을 추가
  for (let i = 0; i < completeLineNum; i++) {
    gameBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
};

/*
  EventListener
*/

// 마우스 커서가 #left와 충돌
cursorLeft.addEventListener("mouseenter", (e) => {
  // 다음 위치 설정
  const nextPosition = [currentPosition[0], currentPosition[1] - 1];
  // FLAG: 기본값 true(이동 가능)
  let canUserMove = true;
  // block 생성
  let block = currentBlock;

  // 현재 위치에서 한 칸 왼 쪽을 탐색
  for (let i = currentPosition[0]; i < currentPosition[0] + block.length; i++) {
    // 왼쪽으로 갈 수 없는 경우 반복문 escape
    if (!canUserMove) break;
    for (
      let j = currentPosition[1];
      j < currentPosition[1] + block.length;
      j++
    ) {
      if (
        (gameBoard[i][j] === 1 && currentPosition[1] === 0) ||
        gameBoard[i][j - 1] === 2
      ) {
        // 왼쪽 끝에 도달한 경우 || 왼쪽에 값이 2인 block이 있는 경우
        canUserMove = false;
      }
    }
  }

  // canUserMove === true
  if (canUserMove) {
    currentPosition = nextPosition;

    // gameBoard 배열에 현재 블록 위치 업데이트
    gameBoard.forEach((tr, i) => {
      for (let j = 0; j < tr.length; j++) {
        const td = tr[j];
        if (gameBoard[i][j - 1] === 0 && td !== 2) {
          gameBoard[i][j - 1] = td;
          gameBoard[i][j] = 0;
        }
      }
    });
    draw();
  }
});

// 마우스 커서가 #right와 충돌
cursorRight.addEventListener("mouseenter", (e) => {
  // 다음 위치 설정
  const nextPosition = [currentPosition[0], currentPosition[1] + 1];
  // FLAG: 기본값 true(이동 가능)
  let canUserMove = true;
  // block 생성
  let block = currentBlock;

  // 현재 위치에서 한 칸 오른쪽을 탐색
  for (let i = currentPosition[0]; i < currentPosition[0] + block.length; i++) {
    // 오른쪽으로 갈 수 없는 경우 반복문 escape
    if (!canUserMove) break;
    for (
      let j = currentPosition[1];
      j < currentPosition[1] + block.length;
      j++
    ) {
      if (
        gameBoard[i][j] === 1 &&
        ((gameBoard[i] && gameBoard[i][j + 1] === undefined) ||
          (gameBoard[i] && gameBoard[i][j + 1] === 2))
      ) {
        // 오른쪽 끝에 도달한 경우 || 오른쪽에 값이 2인 block이 있는 경우
        canUserMove = false;
      }
    }
  }

  // canUserMove === true
  if (canUserMove) {
    currentPosition = nextPosition;

    // gameBoard 배열에 현재 블록 위치 업데이트
    gameBoard.forEach((tr, i) => {
      for (var j = tr.length - 1; j >= 0; j--) {
        const td = tr[j];
        if (gameBoard[i][j + 1] === 0 && td !== 2) {
          gameBoard[i][j + 1] = td;
          gameBoard[i][j] = 0;
        }
      }
    });
    draw();
  }
});

cursorDown.addEventListener("mouseenter", (e) => {
  while (loop()) {}
});

/*
    함수 실행
*/

init();
create();
let game = setInterval(loop, 400);
