/**
 * @param {number[]} nums
 * @return {number}
 */
var makePrefSumNonNegative = function (nums) {
    const heap = [];
    const push = (v) => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = l + 1;
                let m = i;
                if (l < heap.length && heap[l] < heap[m]) m = l;
                if (r < heap.length && heap[r] < heap[m]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    let prefix = 0;
    let ops = 0;
    for (const num of nums) {
        prefix += num;
        // Every element seen so far is a deferral candidate; a negative is
        // handled not when read but at the first prefix it poisons.
        push(num);
        // Prefix dipped below zero: defer the smallest element seen so far
        // to the end. Removing the minimum raises the prefix the most, so by
        // an exchange argument this uses the fewest operations.
        while (prefix < 0) {
            prefix -= pop();
            ops += 1;
        }
    }
    return ops;
};
