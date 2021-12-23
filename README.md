[] gh-pages에서 react-masterclass가 하나의 링크로 인식되는 오류 해결.

[] react-form-rom 연습하기. 나는 event를 한꺼번에 출력하고 싶은데 그게 잘 안됨
[] 그리고 나는 그냥 새로운 객체 하나 만들어서 그걸로 setToDOs를 바꾸어주려고 했는데 그게 안되던데.

[] typescript 연습하기. atom({}) 에서 atom<string[]>({}) 이런 식으로 해주던데.
atom이 무언가를 반환하기 때문인가. default로 [] 이걸 반환하고, 그 안에 들어가는것을 정의해주어야 하는건가

[] {coinId} 이게 잘 안되니까요.

[] localstorage에 toDo 저장하기
[] 사용자 custom category를 만들기.

[] 그런데요.. 여전히 enum 사용법은 잘 모르겠고 typescript도.. 한번 정리가 필요할듯.

[] typescript
[] react-beautiful-dnd
[] react-hook-form
[] recoil

[] board 옮기기. localstorage 저장하기.

[] 고쳐야할 것 2가지

1. 일단 이 보드 자체가 메차쿠차임.
   보드를 drop하는 부분이 되어야 하는데,
   가까이 가져가면, TODO BOARD가 이걸 잡아끌어버리니까.

2. 그리고 console에서 index가 2가 되어버리는데
   이것도 해결해야함.

3. 만약 올바른 index를 받았다고 할때 무엇을 해야하는가

일단, toDo atom 안에 있는 key들의 배열순서를 조정해서
렌더링이 다시 일어나도록 해야함

객체 안에 있는 key들을 index에 따라서 재 배열할 수 있나?

예를 들어 source.index거의 key를 지우고,
dest.index의 key 부분에 object key를 삽입할 수 있냐

이건 map을 써야하는건가.
