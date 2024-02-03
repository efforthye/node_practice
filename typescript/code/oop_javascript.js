class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    growOlder() {
        this.age += 1;
    }
}

const hyerim = new Person('Hyerim', 23);

// 외부에서 age 속성을 마음대로 조작할 수 있다.
spartan.age = 25;
spartan.growOlder();

// 1살을 더 먹었지만 26세이다.
console.log(spartan.age); // 26

