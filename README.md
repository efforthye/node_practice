# node_practice

## Symbol.iterator 이란?
- `Symbol.iterator` 는 JS에서 사용하는 내장 심볼 중 하나로, iterable 객체(반복 가능한 객체)를 나타내는 데 사용된다.
    - iterable 객체는 순회 가능하며, 순회할 때마다 값을 반환하는 반복자(iterator)를 가지고 있다.
- `Symbol.iterator` 는 객체의 속성으로 존재하며, 이 속성에는 iterator 객체를 반환하는 메서드가 연결되어 있어야 한다.
    - iterator 객체는 `next()` 메서드를 가지고 있어서 값을 순회하고 반환할 수 있게 한다.
- ex) 배열은 iterable 객체이다. 배열의 `Symbol.iterator` 속성은 배열의 iterator 객체를 반환하고, 해당 iterator 객체를 사용하여 배열의 요소를 하나씩 순회한다.
- `Symbol.iterator` 는 배열 뿐만 아니라 많은 JavaScript 객체 및 데이터 구조에서 사용된다. 
- Interable 객체를 사용하면 반복 작업을 쉽게 수행할 수 있다. 이터레이터는 `for...of` 루프와 같은 반복문과 함께 자주 활용된다.
    - iterator 를 구현하여 iterable 객체를 만들면 `for of` 문에 의해 반복이 가능하다.

## 이터레이터(iterator)와 이터러블(iterable)
- 이터레이터(iterator): `next()` 메서드가 있는 객체로, next()를 호출할 때마다 시퀀스의 다음 값과 완료 여부를 나타내는 플래그를 반환한다.
    - ex) `{value: 10, done: false}`
- 이터러블(iterable): 이터레이터를 가져오는 표준 메서드가 존재하는 객체이다. 이는 Symbol.iterator 프로퍼티에서 이터레이터를 반환하는 메서드를 구현하면 된다.
    - 프로퍼티: 객체 내에서 키와 연관된 값을 나타내는 것을 의미한다.

## for of와 for in의 차이
- for of: 배열 이터레이터 에 의해 정의된 엔트리의 값 (value) 을 제공한다. 이터레이터는 for-of 에서만 쓰는 건 아니며, 스프레드 구문, 디스트럭처링, Promise.all(), Array.from(), Map, Set 등도 이터레이터를 사용한다.
- for in: enumerable property 를 순회하며, 배열 엔트리 속성 이름 (key) 만 제공한다.