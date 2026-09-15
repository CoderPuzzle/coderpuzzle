function getStrongest(arr: number[], k: number): number[] {
    const sortedArr = [...arr].sort((a, b) => a - b);
    const m = sortedArr[(arr.length - 1) >> 1];
    // min-heap of [distance, value, index] whose root is the weakest
    // keeper: shortest distance, then smallest value, then latest index
    // — a later duplicate can never outrank an earlier one.
    const heap: [number, number, number][] = [];
    const weaker = (a: [number, number, number], b: [number, number, number]): boolean => {
        if (a[0] !== b[0]) return a[0] < b[0];
        if (a[1] !== b[1]) return a[1] < b[1];
        return a[2] > b[2];
    };
    const push = (item: [number, number, number]): void => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (!weaker(heap[i], heap[p])) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): [number, number, number] => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let best = i;
                if (l < heap.length && weaker(heap[l], heap[best])) best = l;
                if (r < heap.length && weaker(heap[r], heap[best])) best = r;
                if (best === i) break;
                [heap[best], heap[i]] = [heap[i], heap[best]];
                i = best;
            }
        }
        return top;
    };
    for (let i = 0; i < arr.length; i++) {
        const entry: [number, number, number] = [Math.abs(arr[i] - m), arr[i], i];
        if (heap.length < k) {
            push(entry);
            continue;
        }
        const root = heap[0];
        // Replace the root only when the newcomer is strictly mightier:
        // longer distance, or larger value on a distance tie (an exact
        // duplicate never displaces an earlier index).
        if (
            entry[0] > root[0] ||
            (entry[0] === root[0] && entry[1] > root[1]) ||
            (entry[0] === root[0] && entry[1] === root[1] && entry[2] < root[2])
        ) {
            pop();
            push(entry);
        }
    }
    // The heap holds the top k; emit them by original index.
    heap.sort((a, b) => a[2] - b[2]);
    return heap.map(([, value]) => value);
}
