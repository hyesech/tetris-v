// 게임 상수 선언
const COLS = 20; // 세로
const ROWS = 10; // 가로

// 게임 상수 선언
const tetris = document.querySelector("#tetris");
const blockData = {
  name: "block",
  shape: [
    [1, 1],
    [1, 1],
  ],
};

// 전역 변수 선언
var tetrisData = [];
var currentBlock = [];
var currentPosition = []; // 변경된다.

/*
    주요 함수: INIT, CREATE, DROP
*/

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

    // 0으로 전체 초기화
    const column = Array(ROWS).fill(0);
    tetrisData.push(column);
  });
  tetris.appendChild(fragment);
};

// CREATE: 블록 생성 + 화면에 그리기
const create = () => {
  console.log("FUNC: CREATE");

  // 블록 스폰 위치: 가상의 맨 윗줄이 있는 것처럼 연산
  currentPosition = [0, 4];

  // 블록 데이터 생성: 맨 윗줄을 삭제하고 연산한다.
  currentBlock = blockData.shape;

  currentBlock.forEach((tr, i) => {
    tr.forEach((td, j) => {
      tetrisData[i][j + 4] = td;
    });
  });

  // 블록 데이터를 바탕으로 화면에 그리기
  draw();
};

// LOOP: 1초마다 반복하며 블록을 한 칸 아래로 이동
const loop = () => {
  console.log("FUNC: LOOP");

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
      if (tetrisData[i][j] === 1) {
        // 움직일 수 있는 Block인 경우
        movingBlocks.push([i, j]);
        if (tetrisData[i + 1] === undefined || tetrisData[i + 1][j] === 2) {
          // 최하단에 도달한 경우 || 아래에 값이 2인 block이 있는 경우
          canMove = false;
        }
      }
    }
  }

  // FLAG 상태에 따라 작업 분기
  if (canMove) {
    console.log("이동 가능");

    // tetrisData 배열에 현재 블록 위치 업데이트
    for (let i = tetrisData.length - 1; i >= 0; i--) {
      const tr = tetrisData[i];
      tr.forEach((td, j) => {
        if (td === 1 && tetrisData[i + 1] && tetrisData[i + 1][j] !== 2) {
          tetrisData[i + 1][j] = td;
          tetrisData[i][j] = 0;
        }
      });
    }
    // 매 loop마다 반복해야 하는 작업
    currentPosition = nextPosition;
    draw();

    // Space 구현
    return true;
  } else if (!canMove) {
    console.log("이동불가 ---> 색상 변경");
    movingBlocks.forEach((cell) => {
      tetrisData[cell[0]][cell[1]] = 2;
    });

    // 줄 삭제 가능한지 체크: rows가 전부 1인 경우
    checkLines();
    // 다음 위치에 새 블록 생성
    create();

    // Space 구현
    return false;
  }
};

/*
    Util 함수: draw, checkLines, is
*/
const draw = () => {
  console.log("func: draw");

  tetrisData.forEach((tr, i) => {
    tr.forEach((td, j) => {
      if (td === 0) {
        tetris.children[i].children[j].className = "white";
      } else if (td === 1) {
        tetris.children[i].children[j].className = "blue";
      } else if (td === 2) {
        tetris.children[i].children[j].className = "red";
      }
    });
  });
};

const checkLines = () => {
  console.log("func: check rows");

  // 완성된 줄(Line)의 index 값을 담을 배열
  const completeLine = [];

  // tetrisData를 tr(줄) 단위로 순회: 모든 칸이 2인 경우 index 값을 completeLine 배열에 push
  tetrisData.forEach((tr, i) => {
    let lineCount = 0;
    tr.forEach((td, j) => {
      if (td === 2) {
        lineCount++;
      }
    });
    if (lineCount === 10) {
      completeLine.push(i);
    }
  });

  // completeLine에 담긴 index 값에 해당하는 줄 값을 0으로 변경
  // completeLine 배열의 길이 (0이 된 줄 수) 만큼 tetrisData 배열의 앞쪽에 새 tr 배열을 추가
  completeLine.forEach((tr, i) => {});
  console.log(completeLine);
};

/*
  EventListener
*/

// Keyboard 조작을 위한 event listener 추가
window.addEventListener("keyup", (e) => {
  // 누르는 key의 방향에 따라 분기문 작성
  switch (e.code) {
    case "ArrowLeft": {
      // 왼 쪽으로 한 칸 이동
      console.log("Left");
      // 다음 위치 설정
      const nextPosition = [currentPosition[0], currentPosition[1] - 1];
      // FLAG: 기본값 true(이동 가능)
      let canUserMove = true;
      // block 생성
      let block = currentBlock;

      // 현재 위치에서 한 칸 왼 쪽을 탐색
      for (
        let i = currentPosition[0];
        i < currentPosition[0] + block.length;
        i++
      ) {
        // 왼쪽으로 갈 수 없는 경우 반복문 escape
        if (!canUserMove) break;
        for (
          let j = currentPosition[1];
          j < currentPosition[1] + block.length;
          j++
        ) {
          console.log(currentPosition[1]);
          console.log(tetrisData[1]);
          if (
            (tetrisData[i][j] === 1 && currentPosition[1] === 0) ||
            tetrisData[i][j - 1] === 2
          ) {
            // 왼쪽 끝에 도달한 경우 || 왼쪽에 값이 2인 block이 있는 경우
            console.log("cant go left");
            canUserMove = false;
          }
        }
      }

      // canUserMove === true
      if (canUserMove) {
        currentPosition = nextPosition;

        // tetrisData 배열에 현재 블록 위치 업데이트
        tetrisData.forEach((tr, i) => {
          for (let j = 0; j < tr.length; j++) {
            const td = tr[j];
            if (tetrisData[i][j - 1] === 0 && td !== 2) {
              tetrisData[i][j - 1] = td;
              tetrisData[i][j] = 0;
            }
          }
        });
        draw();
      }
      // 그 외의 경우
      break;
    }

    case "ArrowRight": {
      // 오른 쪽으로 한 칸 이동
      console.log("Right");

      // 다음 위치 설정
      const nextPosition = [currentPosition[0], currentPosition[1] + 1];
      // FLAG: 기본값 true(이동 가능)
      let canUserMove = true;
      // block 생성
      let block = currentBlock;

      // 현재 위치에서 한 칸 오른쪽을 탐색
      for (
        let i = currentPosition[0];
        i < currentPosition[0] + block.length;
        i++
      ) {
        // 오른쪽으로 갈 수 없는 경우 반복문 escape
        if (!canUserMove) break;
        for (
          let j = currentPosition[1];
          j < currentPosition[1] + block.length;
          j++
        ) {
          console.log(currentPosition[1]);
          console.log(tetrisData[1]);
          if (
            tetrisData[i][j] === 1 &&
            ((tetrisData[i] && tetrisData[i][j + 1] === undefined) ||
              (tetrisData[i] && tetrisData[i][j + 1] === 2))
          ) {
            // 오른쪽 끝에 도달한 경우 || 오른쪽에 값이 2인 block이 있는 경우
            console.log("cant go right");
            canUserMove = false;
          }
        }
      }

      // canUserMove === true
      if (canUserMove) {
        currentPosition = nextPosition;

        // tetrisData 배열에 현재 블록 위치 업데이트
        tetrisData.forEach((tr, i) => {
          for (var j = tr.length - 1; j >= 0; j--) {
            const td = tr[j];
            if (tetrisData[i][j + 1] === 0 && td !== 2) {
              tetrisData[i][j + 1] = td;
              tetrisData[i][j] = 0;
            }
          }
        });
        draw();
      }
      break;
    }

    case "ArrowDown": {
      while (loop()) {}
      break;
    }
  }
});

/*
    함수 실행
*/

init();

create();

setInterval(loop, 500);
