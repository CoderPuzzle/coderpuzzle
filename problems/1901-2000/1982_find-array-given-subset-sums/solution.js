/**
 * @param {number} n
 * @param {number[]} sums
 * @return {number[]}
 */
var recoverArray = function (n, sums) {
    let cur = sums.slice().sort((a, b) => a - b);
    const res = [];
    while (cur.length > 1) {
        const diff = cur[cur.length - 1] - cur[cur.length - 2];
        const cnt = new Map();
        for (const x of cur) {
            cnt.set(x, (cnt.get(x) || 0) + 1);
        }
        const left = []; // sums without the candidate element
        const right = []; // sums with the candidate element
        for (const x of cur) {
            if ((cnt.get(x) || 0) > 0) {
                cnt.set(x, cnt.get(x) - 1);
                left.push(x);
                cnt.set(x + diff, (cnt.get(x + diff) || 0) - 1);
                right.push(x + diff);
            }
        }
        if (left.includes(0)) {
            res.push(diff);
            cur = left;
        } else {
            res.push(-diff);
            cur = right;
        }
    }
    return res;
};
