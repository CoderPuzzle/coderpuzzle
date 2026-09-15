type Item = [number, number, number];

function maxAverageRatio(classes: number[][], extraStudents: number): number {
    // Tuple layout mirrors the Python reference: [negGain, p, t].
    const less = (a: Item, b: Item): boolean => {
        if (a[0] !== b[0]) return a[0] < b[0];
        if (a[1] !== b[1]) return a[1] < b[1];
        return a[2] < b[2];
    };

    const gain = (p: number, t: number): number => (p + 1) / (t + 1) - p / t;

    // Below is a literal port of CPython's heapq so the array layout — and
    // therefore the final summation order — matches the Python reference exactly.
    const siftUp = (heap: Item[], pos: number): void => {
        const endpos = heap.length;
        const startpos = pos;
        const newitem = heap[pos];
        let childpos = 2 * pos + 1;
        while (childpos < endpos) {
            const rightpos = childpos + 1;
            if (rightpos < endpos && !less(heap[childpos], heap[rightpos])) {
                childpos = rightpos;
            }
            heap[pos] = heap[childpos];
            pos = childpos;
            childpos = 2 * pos + 1;
        }
        heap[pos] = newitem;
        siftDown(heap, startpos, pos);
    };

    const siftDown = (heap: Item[], startpos: number, pos: number): void => {
        const newitem = heap[pos];
        while (pos > startpos) {
            const parentpos = (pos - 1) >> 1;
            const parent = heap[parentpos];
            if (less(newitem, parent)) {
                heap[pos] = parent;
                pos = parentpos;
                continue;
            }
            break;
        }
        heap[pos] = newitem;
    };

    const heapify = (heap: Item[]): void => {
        const n = heap.length;
        for (let i = (n >>> 1) - 1; i >= 0; i--) {
            siftUp(heap, i);
        }
    };

    const heappush = (heap: Item[], item: Item): void => {
        heap.push(item);
        siftDown(heap, 0, heap.length - 1);
    };

    const heappop = (heap: Item[]): Item => {
        const lastelt = heap.pop() as Item;
        if (heap.length > 0) {
            const returnitem = heap[0];
            heap[0] = lastelt;
            siftUp(heap, 0);
            return returnitem;
        }
        return lastelt;
    };

    // Average over a fixed class count, so maximize the ratio sum: one more
    // student in class (p, t) gains (p+1)/(t+1) - p/t, and that marginal
    // gain shrinks as the class grows — allocate each identical student
    // where it buys the most.
    const heap: Item[] = classes.map(([p, t]) => [-gain(p, t), p, t]);
    heapify(heap);
    for (let i = 0; i < extraStudents; i++) {
        const top = heappop(heap);
        const p = top[1] + 1;
        const t = top[2] + 1;
        // Re-push: after absorbing a student the class's gain drops and
        // another class may now offer the best marginal return.
        heappush(heap, [-gain(p, t), p, t]);
    }
    // Python's sum() uses Neumaier compensated summation for floats; mirror it
    // so the final average is bit-identical to the reference.
    let f: number = heap[0][1] / heap[0][2];
    let c = 0;
    for (let i = 1; i < heap.length; i++) {
        const x: number = heap[i][1] / heap[i][2];
        const t: number = f + x;
        if (Math.abs(f) >= Math.abs(x)) {
            c += f - t + x;
        } else {
            c += x - t + f;
        }
        f = t;
    }
    return (f + c) / heap.length;
}
