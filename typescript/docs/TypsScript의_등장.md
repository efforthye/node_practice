# TypeSciprt의 등장
- TypeScript는 JavaScript의 모든 기능을 포함함과 동시에 추가적인 기능을 제공한다. (한마디로 JavaScript의 Superset이다.)

## TypeScript의 탄생 배경
- TypeScript는 Microsoft에서 개발한 오픈 소스 프로그래밍 언어이다.
- JavaScript의 단점(동적 타입 언어)을 상쇄하기 위해 탄생하게 되었다.

## JavaScript의 단점 요약
1. 실행 시간(런타임 중)에 결정되는 변수의 타입
2. 약한 타입 체크
3. 너무나도 물렁물렁한 객체

## TypeScript가 들어오고 나서 바뀐 부분
1. 실행 시간(런타임 중)에 결정되는 변수의 타입
    - 이제는 컴파일 시간에 변수의 타입을 체크한다.
    - JavaScript 코드의 문제점
        ```
        function add(a, b){
            return a+b;
        }
        const result = add(1, '2');
        console.log(result); // "12"
        console.log(typeof result); // "string"
        ```
        - 덧셈 함수를 만들었으니 숫자 결과를 받아야 하는데 문자열이 결과로 출력됨.
        - 이러한 예상치 못한 코드들이 쌓이면 실제 서비스 시 디버깅이 매우 어려워짐.
    - TypeScript 코드를 도입하고 나니 달라진 점
        1. VSCode에서 타입 오류를 캐치한다.
        ![입력 시 출력되는 에러](<images/스크린샷 2024-02-03 오후 2.01.30.png>)
            - VSCode에서 코드를 입력하는 순간 에러 메시지를 발생시킨다.
        2. 컴파일 시간에 오류를 캐치한다.
        ![!\[실행 시 출력되는 에러\](<images/스크린샷 2024-02-03 오후 1.38.49.png>)](<images/스크린샷 2024-02-03 오후 2.05.21.png>)
            - 실제로 실행을 시키면 컴파일 시간에 변수의 타입을 체크하기 때문에 만약 오류가 있을 시 실행이 되지 못하고 컴파일 에러를 발생시켜서 쓸데없는 에러 걱정을 하지 않아도 된다.
2. 약한 타입 체크
    - 이제는 VSCode에 코드를 입력하는 순간 에러 메시지가 발생한다.
    ![!\[다른 타입 값 대입 시 에러\](<images/스크린샷 2024-02-03 오후 1.43.47.png>)](<images/스크린샷 2024-02-03 오후 2.09.30.png>)
        - 한 번 지어진 변수에는 타입이 고정되어, 다른 타입의 값을 할당하려 할 때 바로 오류가 출력되어 개발시 타입을 착각하는 등의 오류에서 벗어날 수 있다.
3. 너무나도 물렁물렁한 객체
    - 이제는 VSCode에 코드를 입력하는 순간 에러 메시지가 발생한다.
    ![!\[없는 속성 접근시 에러\](<images/스크린샷 2024-02-03 오후 1.46.45.png>)](<images/스크린샷 2024-02-03 오후 2.14.01.png>)
        - 이로인해 정의되지 않은 프로퍼티를 연산하여 NaN으로 변하는 현상을 미연에 방지할 수 있다.
        - 이로인해 붕어빵을 만드는 틀에서 실제 붕어빵만 나올 수 있게 코딩할 수 있다.

## TypeScript의 추가적인 매력
- 객체 지향 프로그래밍(OOP)을 할 때도 JavaScript에 비해서 TypeScript는 훨씬 더 큰 메리트가 있다.
    - JavaScript 객체 지향 프로그래밍 예시
        ```
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
        hyerim.age = 100;
        hyerim.growOlder();

        // 나는 1살을 더 먹었지만 101세이다.
        console.log(hyerim.age); // 101
        ```
        - 객체 지향 프로그래밍 언어(JAVA, C++, C#, ...)에서는 다양한 접근 제어자(public, private 등)를 통하여 클래스를 구성하는 프로퍼티의 캡슐화를 보장하고 함수의 호출 범위를 조정할 수 있다. 그런데 위 JavaScript 예제에서는 아무나 속성에 직접 접근하여 값을 변경할 수 있다는 특징이 있다..
            - 캡슐화: 객체의 속성과 행위를 하나로 묶고, 실제 구현 내용 일부를 내부에 감추어 은닉한다.
            - 위 코드를 통하여 기대한 것은 처음 생성자를 통해 생성한 객체를 growOlder() 메서드를 통하여 하나씩 나이를 증가하는 것을 원했는데, 실제로는 한방에 age 속성이 조작되어 버려서 원치않게 동작하고 있다.
            - 이는 클래스를 설계하고 만든 사람의 의도에 따라 사용이 되어야 하는데 그게 보장이 안 되는 경우라고 볼 수 있다.
    - TypeScript 객체 지향 프로그래밍 예시
        ```
        class Person {
            // name과 age를 private를 지정하였다.
            private _name: string;
            private _age: number;

            constructor(name: string, age: number){
                this._name = name;
                this._age = age;
            }

            public growOlder(): void {
                this._age += 1;
            }
        }

        const hyerim = new Person('Hyerim', 23);

        hyerim.age = 100; // 'age' 속성은 private이며 'Person' 클래스 내에서만 액세스할 수 있습니다.
        hyerim.growOlder();

        console.log(hyerim.age); // 'age' 속성은 private이며 'Person' 클래스 내에서만 액세스할 수 있습니다.
        ```
        - 사실은 위 코드처럼 동작하여야 맞다. Person이라는 클래스를 만든 사람의 의도는 growOlder() 메서드를 통하여 나이가 증가하기를 원했는데, 만약 협업을 할 때 다른 사람이 메서드 호출이 아닌 다른 방식으로 조작할 수 있는 경로를 애초에 에러를 통하여 막아줄 수 있기 때문이다.
        - 이와같은 경우 private으로 선언한 속성은 직접적으로 접근할 수 없고, getter()를 따로 만들어서 해당 함수를 통하여 접근할 수 있도록 설정해 주어야 한다
            - getter 예시
                ```
                public get name(): string {
                    return this._name;
                }
                get age(){
                    return this.age;
                }
                ```
- 위 항목 뿐만 아니라 TypeScirpt는 `d.ts` 라는 확장자를 가진 `선언 파일`을 통해서 외부 모듈의 타입 정보를 제공할 수 있다.
    - 이는 `@types 패키지`와 관련되어 있다.
    - 이렇게 선언 파일을 설치하면 JavaScript 라이브러리도 TypeScript에서 안전하게 사용 가능하다고 한다.

## ETC
- TypeScript를 학습하면 이후 정적 타입 시스템, 객체 지향 프로그래밍, 디자인 패턴 등 다양한 프로그래밍 개념을 학습할 수 있다.
- TypeScript는 JavaScript에 비해 언어에서 보장되는 안정성을 바탕으로 테스트 코드가 줄어들게 되어 비즈니스 로직 작성에 집중할 수 있게 된다.
