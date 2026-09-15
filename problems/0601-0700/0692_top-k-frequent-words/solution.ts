function topKFrequent(words: string[], k: number): string[] {
    // One counting pass over the array.
    const counts = new Map<string, number>();
    for (const w of words) {
        counts.set(w, (counts.get(w) || 0) + 1);
    }
    // min-heap of [word, count] whose root is the weakest keeper:
    // smallest count, and among equal counts the largest word —
    // eviction order mirrors the final ranking.
    type Item = [string, number];
    const less = (a: Item, b: Item): boolean => (a[1] !== b[1] ? a[1] < b[1] : a[0] > b[0]);
    const heap: Item[] = [];
    const push = (item: Item): void => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (!less(heap[i], heap[p])) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): Item => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < heap.length && less(heap[l], heap[m])) m = l;
                if (r < heap.length && less(heap[r], heap[m])) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };
    for (const [word, count] of counts) {
        const item: Item = [word, count];
        if (heap.length < k) {
            push(item);
            continue;
        }
        const root = heap[0];
        // Replace the root only when the newcomer outranks it: higher
        // count, or equal count and smaller word.
        if (count > root[1] || (count === root[1] && word < root[0])) {
            pop();
            push(item);
        }
    }
    // Survivors are exactly the top k by (higher count, then smaller
    // word); emit them in that order. The comparator is explicit about
    // both keys — never the default lexicographic sort — and fully
    // orders every pair, so no sort-stability assumption can leak in.
    heap.sort((a, b) => (a[1] !== b[1] ? b[1] - a[1] : a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    return heap.slice(0, k).map(([word]) => word);
}
