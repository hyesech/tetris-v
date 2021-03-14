const tetris = document.querySelector("#tetris");
const tetrisData = [];

// 10x20 칸 만들기(table)
const drawCell = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 20; i++) {
    const tr = document.createElement("tr");
    fragment.appendChild(tr);
    for (let j = 0; j < 10; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);
    }
  }
  console.log(tetris, fragment);
  tetris.appendChild(fragment);
};

// Keyboard 조작을 위한 event listener 추가
window.addEventListener("keyup", (e) => {
  console.log(e);
  // 누르는 key의 방향에 따라 분기문 작성
  switch (e.code) {
    case "Space":
      // 한 번에 다운
      break;

    case "ArrowLeft":
      // 왼 쪽으로 한 칸 이동
      break;

    case "ArrowRight":
      // 오른 쪽으로 한 칸 이동
      break;

    default:
      break;
  }
});

// 10x20 칸 만들기 실행
drawCell();
