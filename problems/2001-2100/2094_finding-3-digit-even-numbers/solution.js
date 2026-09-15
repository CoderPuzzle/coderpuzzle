/**
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function (digits) {
    const available = new Array(10).fill(0);
    for (const digit of digits) {
        available[digit]++;
    }

    const answer = [];
    for (let number = 100; number < 1000; number += 2) {
        const needed = new Array(10).fill(0);
        needed[Math.floor(number / 100)]++;
        needed[Math.floor(number / 10) % 10]++;
        needed[number % 10]++;
        if (needed.every((count, digit) => count <= available[digit])) {
            answer.push(number);
        }
    }
    return answer;
};
