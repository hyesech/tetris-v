# tetris-v
테트리스 게임의 주요 기능은 다음과 같습니다.

---

## 주요 상수
1. **tetris**: html에서 테이블 태그를 선택합니다.
2. **blockData**: 2x2 블록의 정보와 형태를 지정합니다.
3. **cursorLeft**: 마우스 커서 위치 판정을 위해 aside#left 태그를 선택합니다.
4. **cursorRight**: 마우스 커서 위치 판정을 위해 aside#rignt 태그를 선택합니다.


## 주요 변수
1. **tableData**: 10x20 크기의 테이블에 배치될 블록의 정보를 담는 2차원 배열입니다.
2. **currentBlock**: 현재 지정된 블록(2x2 블록)의 정보를 담는 배열입니다.
3. **currentPosition**: 블록의 현재 위치 정보를 담는 배열입니다.
   
---

## 주요 함수
#### `init()`
- 게임을 실행합니다.
- 10x20 테이블 데이터(게임 보드)를 생성합니다.

#### `create()`
- 2x2 블록 데이터를 생성합니다.
- 블록 생성 시 화면을 출력합니다.
- 게임 종료 여부를 판정합니다.

  
#### `loop()`
- 일정 시간 간격(0.4s)마다 한 번씩 실행되며 2x2 블록을 아래로 한 칸씩 떨어뜨립니다.
- 블록이 하단으로 이동 가능한 경우와 불가능한 경우를 판정합니다.
- 블록이 하단으로 이동 가능한 경우 화면을 출력합니다.
- 블록이 하단으로 이동 불가한 경우 삭제할 수 있는 줄이 있는지 체크합니다.

---
## 보조 함수
#### `draw()`
- blockData 값을 바탕으로 CSS를 조작해 화면에 색상을 출력합니다.

#### `checkLines()`
- 1줄이 블럭으로 빠짐없이 메워진 경우, 해당 줄의 모든 블럭을 삭제합니다.
- 삭제한 줄의 수만큼 게임 보드 상단에 줄을 추가합니다.

---
---

#### **드리는 글**
과제를 진행하면서 알게 된 것과, 필요한 정보, 마주친 문제와 문제 해결 방법을 Github Issue에 답글로 달아 두었습니다. 처음 서류 지원을 할 때 '직무 역량 성장과 자기 계발을 위해 자주 이용하는 방식 또는 채널'에 대해 이야기할 기회가 있었는데, 
