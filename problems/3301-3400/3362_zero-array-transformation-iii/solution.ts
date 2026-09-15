function maxRemoval(nums: number[], queries: number[][]): number {
    // Sweep indices left to right with the queries sorted by start; a
    // max-heap by right endpoint holds the queries covering the current
    // index. Whenever the running coverage of already selected queries
    // falls short of nums[i], select the query reaching farthest right
    // and retire its coverage one step past r via a difference array.
    // Return -1 when the heap runs dry on a deficit.
    queries.sort((a, b) => a[0] - b[0]);
    const heap: number[] = []; // binary max-heap of right endpoints
    const push = (v: number): void => {
        heap.push(v);
        let child = heap.length - 1;
        while (child > 0) {
            const parent = (child - 1) >> 1;
            if (heap[parent] >= heap[child]) break;
            [heap[parent], heap[child]] = [heap[child], heap[parent]];
            child = parent;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length > 0) {
            heap[0] = last;
            let parent = 0;
            for (;;) {
                const left = parent * 2 + 1;
                const right = left + 1;
                let best = parent;
                if (left < heap.length && heap[left] > heap[best]) best = left;
                if (right < heap.length && heap[right] > heap[best]) {
                    best = right;
                }
                if (best === parent) break;
                [heap[parent], heap[best]] = [heap[best], heap[parent]];
                parent = best;
            }
        }
        return top;
    };
    const delta = new Array<number>(nums.length + 1).fill(0);
    let cover = 0;
    let selected = 0;
    let j = 0;
    for (let i = 0; i < nums.length; i++) {
        cover += delta[i];
        while (j < queries.length && queries[j][0] <= i) {
            push(queries[j][1]);
            j++;
        }
        while (cover < nums[i]) {
            while (heap.length > 0 && heap[0] < i) {
                pop();
            }
            if (heap.length === 0) {
                return -1;
            }
            const r = pop();
            cover++;
            delta[r + 1]--;
            selected++;
        }
    }
    return queries.length - selected;
}
