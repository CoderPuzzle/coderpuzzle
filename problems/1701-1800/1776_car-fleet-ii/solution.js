/**
 * @param {number[][]} cars
 * @return {number[]}
 */
var getCollisionTimes = function (cars) {
    const n = cars.length;
    const answer = new Array(n).fill(-1);
    const stack = [];
    // Right-to-left scan; the stack holds cars still free-wheeling, the
    // possible first collisions for everything to their left.
    for (let i = n - 1; i >= 0; i--) {
        const position = cars[i][0],
            speed = cars[i][1];
        // A car at least as fast ahead can never be caught — pop it.
        while (stack.length > 0 && speed <= cars[stack[stack.length - 1]][1]) {
            stack.pop();
        }
        while (stack.length > 0) {
            const j = stack[stack.length - 1];
            // When i would reach j, assuming j keeps its speed.
            const t = (cars[j][0] - position) / (speed - cars[j][1]);
            // If j merges earlier, it has slowed before i arrives: it is no
            // first collision for i (nor for anyone further left), so pop
            // permanently and try the next candidate.
            if (answer[j] > 0 && t >= answer[j]) {
                stack.pop();
            } else {
                answer[i] = t;
                break;
            }
        }
        stack.push(i);
    }
    return answer;
};
