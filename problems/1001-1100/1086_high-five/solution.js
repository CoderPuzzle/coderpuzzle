/**
 * @param {number[][]} items
 * @return {number[][]}
 */
var highFive = function (items) {
    // Bucket every score by student, sort each bucket descending, and
    // average the top five with integer division.
    const scores = new Map();
    for (const [sid, score] of items) {
        if (!scores.has(sid)) scores.set(sid, []);
        scores.get(sid).push(score);
    }
    const ids = [...scores.keys()].sort((a, b) => a - b);
    const result = [];
    for (const sid of ids) {
        const list = scores.get(sid).sort((a, b) => b - a);
        let total = 0;
        for (let i = 0; i < 5; i++) total += list[i];
        result.push([sid, Math.floor(total / 5)]);
    }
    return result;
};
