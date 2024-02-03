class Person {
    // name과 age를 private를 지정하였다.
    private name: string;
    private age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    public growOlder(): void {
        this.age += 1;
    }
}

const hyerim = new Person('Hyerim', 23);

// hyerim.age = 100; // 'age' 속성은 private이며 'Person' 클래스 내에서만 액세스할 수 있습니다.
hyerim.growOlder();

// console.log(hyerim.age); // 'age' 속성은 private이며 'Person' 클래스 내에서만 액세스할 수 있습니다.

