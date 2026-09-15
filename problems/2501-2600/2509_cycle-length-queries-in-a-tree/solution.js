/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var cycleLengthQueries = function (n, queries) {
    // Adding edge (a, b) closes exactly one cycle: the unique tree path
    // between a and b plus the new edge. Walking the deeper endpoint up
    // one parent (v >> 1) at a time until both endpoints meet visits
    // exactly the edges of that path, so the answer is one more than the
    // number of steps taken. Values stay below 2^30 (< 2^53), so every
    // halving step is exact.
    const answer = [];
    for (const [a, b] of queries) {
        let x = a;
        let y = b;
        let steps = 1;
        while (x !== y) {
            if (x > y) {
                x >>= 1;
            } else {
                y >>= 1;
            }
            steps++;
        }
        answer.push(steps);
    }
    return answer;
};
