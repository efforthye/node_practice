function assignGrade(average: number): string {
    if(average>=90) return "A";
    if(average>=80) return "B";
    if(average>=70) return "C";
    if(average>=60) return "D";
    return "F";
}

interface Student {
    name: string;
    age: number;
    scores: {
        korean: number;
        math: number;
        society: number;
        science: number;
        english: number;
    }
}

function calculateAverage(student: Student): number {
    const {korean, math, society, science, english} = student.scores;
    return (korean+math+society+science+english) / Object.keys(student.scores).length;
}

function createStudent(name: string, age: number, korean:number, math:number, society:number, science:number, english:number): Student {
    const student: Student = {
        name,
        age,
        scores: {
            korean,
            math,
            society,
            science,
            english
        }
    }
    return student;
}

function printResult(student: Student) {
    const average = calculateAverage(student);
    const grade = assignGrade(average);
    console.log(`${student.name} (${student.age}세) - 평균: ${average.toFixed(2)}, 학점: ${grade}`);
}

function main(): void {
	const hyerim = createStudent('Hyerim', 22, 96, 97, 98, 99, 100);
	printResult(hyerim);
}
main(); // npm run build && npm run start