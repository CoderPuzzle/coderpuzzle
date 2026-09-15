function minOperations(nums: number[], k: number, queries: number[][]): number[] {
    const n = nums.length;
    // Remainder runs: a window is equalizable iff it sits inside one
    // maximal run of equal remainders, i.e. iff l and r share a mark.
    const run: number[] = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        run[i] = run[i - 1] + (nums[i] % k !== nums[i - 1] % k ? 1 : 0);
    }
    const quot: number[] = nums.map((value) => Math.floor(value / k));
    // Persistent segment tree over the compressed quotients: version i
    // counts the occurrences among nums[0..i-1], so the window [l, r] is
    // version r + 1 minus version l. Node 0 is the empty version.
    const vals = [...new Set(quot)].sort((a, b) => a - b);
    const m = vals.length;
    const indexOf = (value: number): number => {
        let low = 0,
            high = m;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (vals[mid] < value) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    };
    const nodeCap = 20 * n + 10;
    const leftChild: number[] = new Array(nodeCap).fill(0);
    const rightChild: number[] = new Array(nodeCap).fill(0);
    const nodeCount: number[] = new Array(nodeCap).fill(0);
    const nodeSum: number[] = new Array(nodeCap).fill(0);
    let used = 1;
    const roots: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        // Path-copy one root-to-leaf route into fresh nodes; the untaken
        // children keep pointing at the previous version.
        const pos = indexOf(quot[i]);
        let old = roots[i];
        let node = used++;
        leftChild[node] = leftChild[old];
        rightChild[node] = rightChild[old];
        nodeCount[node] = nodeCount[old] + 1;
        nodeSum[node] = nodeSum[old] + quot[i];
        roots[i + 1] = node;
        let lo = 0,
            hi = m - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            const goLeft = pos <= mid;
            old = goLeft ? leftChild[old] : rightChild[old];
            const child = used++;
            leftChild[child] = leftChild[old];
            rightChild[child] = rightChild[old];
            nodeCount[child] = nodeCount[old] + 1;
            nodeSum[child] = nodeSum[old] + quot[i];
            if (goLeft) {
                leftChild[node] = child;
                hi = mid;
            } else {
                rightChild[node] = child;
                lo = mid + 1;
            }
            node = child;
        }
    }
    const answers: number[] = [];
    for (const [l, r] of queries) {
        if (run[l] !== run[r]) {
            answers.push(-1);
            continue;
        }
        let a = roots[l],
            b = roots[r + 1];
        const windowSum = nodeSum[b] - nodeSum[a];
        const size = r - l + 1;
        let need = (size + 1) >> 1;
        let belowCount = 0,
            belowSum = 0;
        let lo = 0,
            hi = m - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            const leftCount = nodeCount[leftChild[b]] - nodeCount[leftChild[a]];
            if (need <= leftCount) {
                a = leftChild[a];
                b = leftChild[b];
                hi = mid;
            } else {
                need -= leftCount;
                belowCount += leftCount;
                belowSum += nodeSum[leftChild[b]] - nodeSum[leftChild[a]];
                a = rightChild[a];
                b = rightChild[b];
                lo = mid + 1;
            }
        }
        const median = vals[lo];
        // Below-median elements climb by their shortfall; elements at or
        // above descend by their excess; equals contribute nothing. Totals
        // stay far below 2^53, so plain numbers are exact here.
        answers.push(median * belowCount - belowSum + (windowSum - belowSum - median * (size - belowCount)));
    }
    return answers;
}
