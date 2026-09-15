/**
 * @param {number[]} arr
 * @return {number}
 */
var oddEvenJumps = function (arr) {
    // The jump out of every index is forced: an odd jump lands on the
    // smallest value >= arr[i] to the right, an even jump on the largest
    // value <= arr[i], and ties go to the smallest index. Build both
    // jump tables with one sort and one stack each: walk the indices
    // ordered by (value, index) — by (negated value, index) for the
    // even table — and each newcomer resolves every still-open index
    // standing to its left, because the first walker with a larger
    // original index is exactly the forced target. Then sweep from the
    // right: odd_ok[i] holds when the odd target's even_ok holds,
    // even_ok[i] when the even target's odd_ok holds, the last index is
    // good under both with zero jumps, and the answer counts the
    // odd_ok starts — every good start opens with an odd jump.
    const n = arr.length;
    const higher = jumpTable(arr, false);
    const lower = jumpTable(arr, true);
    const oddOk = new Array(n).fill(false);
    const evenOk = new Array(n).fill(false);
    oddOk[n - 1] = true;
    evenOk[n - 1] = true;
    let count = 1;
    for (let i = n - 2; i >= 0; i--) {
        const up = higher[i];
        if (up !== -1 && evenOk[up]) {
            oddOk[i] = true;
        }
        const down = lower[i];
        if (down !== -1 && oddOk[down]) {
            evenOk[i] = true;
        }
        if (oddOk[i]) {
            count++;
        }
    }
    return count;
};

// Stack of indices still waiting for their forced target; the first
// walker standing further right resolves each of them.
var jumpTable = function (arr, descending) {
    const n = arr.length;
    const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => {
        if (arr[a] !== arr[b]) {
            return descending ? arr[b] - arr[a] : arr[a] - arr[b];
        }
        return a - b;
    });
    const table = new Array(n).fill(-1);
    const stack = [];
    for (const j of order) {
        while (stack.length > 0 && stack[stack.length - 1] < j) {
            table[stack.pop()] = j;
        }
        stack.push(j);
    }
    return table;
};
