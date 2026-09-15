/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (mat, k) {
    const m = mat.length;
    const first = new Array(m).fill(0);
    const base = mat.reduce((total, row) => total + row[0], 0);
    const heap = [[base, first]];
    const seen = new Set([first.join(",")]);
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (heap[parent][0] <= heap[i][0]) break;
            [heap[parent], heap[i]] = [heap[i], heap[parent]];
            i = parent;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const left = 2 * i + 1;
                const right = 2 * i + 2;
                let smallest = i;
                if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
                if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;
                if (smallest === i) break;
                [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
                i = smallest;
            }
        }
        return top;
    };
    let answer = 0;
    for (let step = 0; step < k; step++) {
        const [total, indexes] = pop();
        answer = total;
        for (let r = 0; r < m; r++) {
            if (indexes[r] + 1 < mat[r].length) {
                const candidate = indexes.slice();
                candidate[r] = indexes[r] + 1;
                const key = candidate.join(",");
                if (!seen.has(key)) {
                    seen.add(key);
                    const nextTotal = total - mat[r][indexes[r]] + mat[r][indexes[r] + 1];
                    push([nextTotal, candidate]);
                }
            }
        }
    }
    return answer;
};
