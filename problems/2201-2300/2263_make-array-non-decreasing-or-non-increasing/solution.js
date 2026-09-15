/**
 * @param {number[]} nums
 * @return {number}
 */
var convertArray = function (nums) {
    const nonDecreasingCost = (values) => {
        const heap = [];
        const push = (v) => {
            heap.push(v);
            let i = heap.length - 1;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (heap[p] >= heap[i]) break;
                [heap[p], heap[i]] = [heap[i], heap[p]];
                i = p;
            }
        };
        const popMax = () => {
            const top = heap[0];
            const last = heap.pop();
            if (heap.length > 0) {
                heap[0] = last;
                let i = 0;
                for (;;) {
                    const l = 2 * i + 1;
                    const r = 2 * i + 2;
                    let big = i;
                    if (l < heap.length && heap[l] > heap[big]) big = l;
                    if (r < heap.length && heap[r] > heap[big]) big = r;
                    if (big === i) break;
                    [heap[i], heap[big]] = [heap[big], heap[i]];
                    i = big;
                }
            }
            return top;
        };
        let cost = 0;
        for (const v of values) {
            push(v);
            if (heap[0] > v) {
                cost += popMax() - v;
                push(v);
            }
        }
        return cost;
    };

    return Math.min(nonDecreasingCost(nums), nonDecreasingCost(nums.map((v) => -v)));
};
