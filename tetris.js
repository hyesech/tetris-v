// 테트리스를 그려낼 부분 선택
const tetris = document.querySelector("#tetris");

// Block의 모양 정의, 테트로미노가 여럿일 경우 배열 값을 늘릴 수 있다.
const blockShape = [
  [1, 1],
  [1, 1],
];

// Cell 데이터 딕셔너리
// {[string:'className', boolean: 테트로미노 이동 가능 여부, Array: blockShape]}
const cellData = {
  0: ["white", false, []],
  1: ["blue", true, blockShape],
  2: ["blue", false, blockShape],
};

// 바닥에 도달한 경우 FLAG
const isBottom = false;

// 현재 테트리스 보드의 데이터
const currentTetrisData = [];

// 게임보드 그리는 함수: 10x20 칸 만들기(table)
const drawCell = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 20; i++) {
    const tr = document.createElement("tr");

    // 참조
    const arr = [];
    currentTetrisData.push(arr);

    fragment.appendChild(tr);
    for (let j = 0; j < 10; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);

      // arr의 기본 값은 0
      arr.push(0);
    }
  }
  console.log(currentTetrisData);
  tetris.appendChild(fragment);
};

// drawBlock: 화면에 블록을 그려주는 함수
// 블록의 색상값을 받아서 해당 cell에 색상을 위치시킨다.
const drawBlock = () => {
  currentTetrisData.forEach((tr, i) => {
    tr.forEach((td, j) => {
      tetris.children[i].children[j].className = cellData[td][0];
    });
  });
};

// createBlock: 블록을 생성하는 함수
// (0,0) 자리가 기본값(왼 쪽 가장 위)인데 + 4로 위치 조정
const createBlock = () => {
  // 블록을 생성하는 부분
  const block = blockShape;
  console.log(block);

  block.forEach((tr, i) => {
    tr.forEach((td, j) => {
      currentTetrisData[i][j + 4] = td;
    });
  });

  // 블록을 화면에 그려주는 함수
  drawBlock();
};

// dropBlock: 루프마다 블록을 아래로 이동
const dropBlock = () => {
  // 밑에서 부터 탐색
  for (let i = currentTetrisData.length - 1; i >= 0; i--) {
    currentTetrisData[i].forEach((td, j) => {
      if (td === 1) {
        if (currentTetrisData[i + 1] && currentTetrisData[i + 1][j] === 0) {
          currentTetrisData[i + 1][j] = td;
          currentTetrisData[i][j] = 0;
        } else {
          // 바닥에 도달하는 경우
          currentTetrisData[i][j] = td * 2;
          // 블록 새로 생성
          createBlock();
        }
      }
    });
  }

  // 블록을 화면에 그려주는 함수
  drawBlock();
};

// Keyboard 조작을 위한 event listener 추가
window.addEventListener("keyup", (e) => {
  // 누르는 key의 방향에 따라 분기문 작성
  switch (e.code) {
    case "Space":
      // 한 번에 다운
      console.log("Space");
      break;

    case "ArrowLeft":
      // 왼 쪽으로 한 칸 이동
      console.log("Left");
      break;

    case "ArrowRight":
      // 오른 쪽으로 한 칸 이동
      console.log("Right");
      break;

    default:
      break;
  }
});

// 10x20 칸 만들기 실행
drawCell();

// block 생성 + block 화면에 그리기
createBlock();

// 블록을 정해진 시간마다 떨어뜨림
setInterval(dropBlock, 1000);
