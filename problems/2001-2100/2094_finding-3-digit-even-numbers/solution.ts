function findEvenNumbers(digits: number[]): number[] {
    const available: number[] = new Array(10).fill(0);
    for (const digit of digits) {
        available[digit]++;
    }

    const answer: number[] = [];
    for (let number = 100; number < 1000; number += 2) {
        const needed: number[] = new Array(10).fill(0);
        needed[Math.floor(number / 100)]++;
        needed[Math.floor(number / 10) % 10]++;
        needed[number % 10]++;
        if (needed.every((count, digit) => count <= available[digit])) {
            answer.push(number);
        }
    }
    return answer;
}
