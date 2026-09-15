/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    const n = temperatures.length;
    const answer = new Array(n).fill(0);
    // Stack of days still waiting for a warmer one; their temperatures
    // are non-increasing bottom to top. Unanswered days keep answer 0.
    const stack = [];
    for (let day = 0; day < n; day++) {
        const temp = temperatures[day];
        // Strictly warmer today resolves each waiting day on top; equal
        // temperatures leave them waiting (strict < comparison).
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temp) {
            const previous = stack.pop();
            answer[previous] = day - previous;
        }
        stack.push(day);
    }
    return answer;
};
