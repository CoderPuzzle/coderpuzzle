/**
 * @param {string} s
 * @param {number[]} answers
 * @return {number}
 */
var scoreOfStudents = function (s, answers) {
    const correct = correctValue(s);
    const numbers = [];
    const operators = [];
    for (let index = 0; index < s.length; index += 2) {
        numbers.push(Number(s[index]));
        if (index + 1 < s.length) operators.push(s[index + 1]);
    }
    const size = numbers.length;
    const dp = Array.from({ length: size }, () => Array.from({ length: size }, () => new Set()));
    for (let index = 0; index < size; ++index) dp[index][index].add(numbers[index]);
    for (let length = 2; length <= size; ++length) {
        for (let left = 0; left + length <= size; ++left) {
            const right = left + length - 1;
            for (let split = left; split < right; ++split) {
                for (const first of dp[left][split]) {
                    for (const second of dp[split + 1][right]) {
                        const value = operators[split] === "+" ? first + second : first * second;
                        if (value <= 1000) dp[left][right].add(value);
                    }
                }
            }
        }
    }

    let score = 0;
    for (const answer of answers) {
        if (answer === correct) score += 5;
        else if (dp[0][size - 1].has(answer)) score += 2;
    }
    return score;
};

function correctValue(expression) {
    let total = 0;
    let product = Number(expression[0]);
    for (let index = 1; index < expression.length; index += 2) {
        const value = Number(expression[index + 1]);
        if (expression[index] === "*") product *= value;
        else {
            total += product;
            product = value;
        }
    }
    return total + product;
}
