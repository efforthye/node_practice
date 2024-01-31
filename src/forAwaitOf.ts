// 이터러블과 이터레이터


// 제너레이터 함수


async function* foo() {
    yield 1;
    yield 2;
}

(async function () {
    for await (const num of foo()) {
        console.log(num);

        break;
    }
})();
