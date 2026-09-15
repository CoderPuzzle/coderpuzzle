/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var platesBetweenCandles = function (s, queries) {
    const length = s.length;
    const platePrefix = new Array(length + 1).fill(0);
    const leftNearest = new Array(length).fill(-1);
    let nearest = -1;
    for (let index = 0; index < length; ++index) {
        platePrefix[index + 1] = platePrefix[index] + (s[index] === "*" ? 1 : 0);
        if (s[index] === "|") nearest = index;
        leftNearest[index] = nearest;
    }

    const rightNearest = new Array(length).fill(-1);
    nearest = -1;
    for (let index = length - 1; index >= 0; --index) {
        if (s[index] === "|") nearest = index;
        rightNearest[index] = nearest;
    }

    return queries.map(([left, right]) => {
        const leftCandle = rightNearest[left];
        const rightCandle = leftNearest[right];
        if (leftCandle === -1 || rightCandle === -1 || leftCandle >= rightCandle) return 0;
        return platePrefix[rightCandle] - platePrefix[leftCandle];
    });
};
