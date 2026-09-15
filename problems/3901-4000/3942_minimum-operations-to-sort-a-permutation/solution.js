/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    const n = nums.length;
    const position = nums.indexOf(0);
    let target;
    if (nums.every((_, i) => nums[(position + i) % n] === i)) {
        target = [0, position];
    } else {
        const reversed = nums.slice().reverse();
        const reversedPosition = reversed.indexOf(0);
        if (!reversed.every((_, i) => reversed[(reversedPosition + i) % n] === i)) {
            return -1;
        }
        target = [1, reversedPosition];
    }

    const queue = [[0, 0]];
    const distance = new Map([["0,0", 0]]);
    for (let head = 0; head < queue.length; head++) {
        const [kind, shift] = queue[head];
        const current = distance.get(kind + "," + shift);
        if (kind === target[0] && shift === target[1]) return current;
        const neighbors = [
            [kind, (shift + 1) % n],
            [1 - kind, (n - shift) % n],
        ];
        for (const [nextKind, nextShift] of neighbors) {
            const key = nextKind + "," + nextShift;
            if (!distance.has(key)) {
                distance.set(key, current + 1);
                queue.push([nextKind, nextShift]);
            }
        }
    }
    return -1;
};
