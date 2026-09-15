function maxTotalValue(nums: number[], k: number): number {
    const n = nums.length;
    // Sparse tables: level j holds the max/min of every window of length
    // 2**j, each derived from the previous level in one pass.
    const maxTable: number[][] = [nums.slice()];
    const minTable: number[][] = [nums.slice()];
    for (let span = 1; span * 2 <= n; span *= 2) {
        const prevMax = maxTable[maxTable.length - 1];
        const prevMin = minTable[minTable.length - 1];
        const nextMax = new Array<number>(n - span * 2 + 1);
        const nextMin = new Array<number>(n - span * 2 + 1);
        for (let i = 0; i < nextMax.length; i++) {
            nextMax[i] = Math.max(prevMax[i], prevMax[i + span]);
            nextMin[i] = Math.min(prevMin[i], prevMin[i + span]);
        }
        maxTable.push(nextMax);
        minTable.push(nextMin);
    }
    const logTable = new Array<number>(n + 1).fill(0);
    for (let i = 2; i <= n; i++) {
        logTable[i] = logTable[i >> 1] + 1;
    }
    // Two overlapping power-of-two windows cover [l, r].
    const spread = (l: number, r: number): number => {
        const j = logTable[r - l + 1];
        const low = 1 << j;
        return Math.max(maxTable[j][l], maxTable[j][r - low + 1]) - Math.min(minTable[j][l], minTable[j][r - low + 1]);
    };
    // Row l is non-increasing as r shrinks toward l, so the heap merges n
    // sorted rows and always holds each row's largest unseen entry.
    type Entry = [number, number, number];
    const heap: Entry[] = [];
    const push = (entry: Entry) => {
        heap.push(entry);
        let index = heap.length - 1;
        while (index > 0) {
            const parent = (index - 1) >> 1;
            if (heap[parent][0] >= heap[index][0]) break;
            [heap[parent], heap[index]] = [heap[index], heap[parent]];
            index = parent;
        }
    };
    const pop = (): Entry => {
        const root = heap[0];
        const last = heap.pop() as Entry;
        if (heap.length > 0) {
            heap[0] = last;
            let index = 0;
            while (true) {
                let largest = index;
                const left = index * 2 + 1;
                const right = left + 1;
                if (left < heap.length && heap[left][0] > heap[largest][0]) largest = left;
                if (right < heap.length && heap[right][0] > heap[largest][0]) largest = right;
                if (largest === index) break;
                [heap[index], heap[largest]] = [heap[largest], heap[index]];
                index = largest;
            }
        }
        return root;
    };

    for (let l = 0; l < n; l++) {
        push([spread(l, n - 1), l, n - 1]);
    }
    let total = 0;
    for (let picked = 0; picked < k; picked++) {
        const [value, l, r] = pop();
        total += value;
        if (r > l) {
            push([spread(l, r - 1), l, r - 1]);
        }
    }
    return total;
}
