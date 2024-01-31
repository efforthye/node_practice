// 1. 이터레이블 객체인 기본 array 정의
const arr = [1, 2, 3];

// 배열의 Iterator 객체 추출
const arrIterator = arr[Symbol.iterator]();

// 배열의 이터레이터 객체 출력: Object [Array Iterator] {}
console.log({arrIterator});

// 이터레이터의 .next() 메서드를 출력한다.
// next()를 호출할 때마다 배열의 다음 요소를 반환하거나
// 더이상 다음 요소가 없을 때 done이 true인 객체를 반환한다.
console.log(arrIterator.next()); // { value: 1, done: false }
console.log(arrIterator.next()); // { value: 2, done: false }
console.log(arrIterator.next()); // { value: 3, done: false }
console.log(arrIterator.next()); // { value: undefined, done: true } (더 이상 요소가 없을 때 done이 true)

// for...of 루프를 사용하여 배열 순회
for (const element of arr) {
    console.log(element);
}


// 2. 이터레이블 객체인 string 정의
const str = 'Hello';

// for...of 루프를 사용하여 문자열 순회
for (const char of str) {
    console.log(char);
}

// 문자열의 Symbol.iterator를 직접 사용하는 방법
const strIterator = str[Symbol.iterator]();
console.log(strIterator.next()); // { value: 'H', done: false }
console.log(strIterator.next()); // { value: 'e', done: false }


// 3-1. 이터레이블 객체인 Set 정의
const mySet = new Set([1, 2, 3]);

// for...of 루프를 사용하여 Set 순회
for (const item of mySet) {
    console.log(item);
}


// 3-2. 이터레이블 객체인 Map 정의
const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);

// for...of 루프를 사용하여 Map 순회
for (const [key, value] of myMap) {
    console.log(key, value);
}


// 4. 사용자 정의 이터레이블 객체 생성
const customIterable = {
    // data라는 배열 속성을 가진다. 순회하려는 데이터를 나타낸다.
    data: [10, 20, 30],

    // Iterable 객체를 생성하려면 객체에 Symbol.iterator 메서드를 구현해야 한다.
    // [Symbol.iterator] 메서드는 Iterator 객체를 반환하는 역할을 한다.
    [Symbol.iterator]: function () {
        // next() 메서드 내에서는 index 변수를 사용하여 배열의 요소를 순회하며, 
        // 각 순회 단계에서 값을 반환하며 index를 증가시킨다.
        let index = 0;
        return {
            // Iterator 객체는 next() 메서드를 가지고 있다.
            // next() 메서드는 매 호출마다 객체를 반환하며, 반환된 객체에는 두 가지 속성이 있다.
            // value: 현재 순회 중인 요소의 값, done: 순회가 완료되었는지 여부를 나타내는 boolean 값
            next: () => {
                if (index < this.data.length) {
                    return { value: this.data[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    },
};

// customIterable 객체를 for...of 루프와 함께 사용하여 해당 객체를 순회 시키면
// 내부의 data 배열에 있는 값을 순회하고, 배열의 끝에 도달하면 순회를 종료한다.
for (const item of customIterable) {
    console.log(item);
}


// 1-2. 이터레이블 객체를 for of 대신 while 으로 반복해도 된다.
const arr2 = ["a", "b", "c"];
const it = arr2[Symbol.iterator]();
console.log(it); // Object [Array Iterator] {}
let result = it.next();
console.log(result); // { value: 'a', done: false }

while (!result.done) {
  console.log(result.value);
  result = it.next();
}


// etc. for of와 for in의 차이
const a: any = ["a", "b", "c"];
a.extra = "extra property";

// for of: 배열 이터레이터에 의해 정의된 엔트리의 값(value)을 제공한다.
// 엔트리: 보통 반복 가능한 객체(Iterable)에서 하나씩 가져오는 값 또는 요소를 나타낸다.
for (const value of a) {
  console.log(value); // a, b, c
}

// for in: enumerable property를 순회하며, 배열 엔트리 속성 이름(key) 만 제공한다.
// enumerable property(열거 가능한 속성): 객체의 속성 중 반복문을 사용하여 열거할 수 있는 속성을 나타낸다.
for (const key in a) {
  console.log(key); // 0, 1, 2, extra
}


// etc. 이터레이터 사용 중 실수 예방 (done이 false임을 보장)
// 무분별한 위치에서 it2.next() 가 수행되는 위험을 줄인다.
const a2 = ["a", "b", "c"];
const it2 = a[Symbol.iterator]();
let result2;

// done이 false인 경우에만 iterator.next()를 수행한다.
while (!(result2 = it2.next()).done) {
    // 값을 찾았다면 return() 메서드로 즉시 종료하여 반복을 중지한다.
    if (result.value === "b") {
      if (it.return) {
        it.return();
      }
      break;
    }
}