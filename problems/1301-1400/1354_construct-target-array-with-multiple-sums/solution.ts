function isPossible(target: number[]): boolean {
    const n = target.length;
    // With no "rest" to un-mix against, the only reachable target is [1].
    if (n === 1) {
        return target[0] === 1;
    }
    // Max-heap for the reverse simulation below.
    const heap: number[] = [];
    const push = (v: number): void => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] >= heap[i]) {
                break;
            }
            const t = heap[p];
            heap[p] = heap[i];
            heap[i] = t;
            i = p;
        }
    };
    const pop = (): number => {
        const top = heap[0];
        const last = heap.pop() as number;
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                const r = l + 1;
                let big = i;
                if (l < heap.length && heap[l] > heap[big]) {
                    big = l;
                }
                if (r < heap.length && heap[r] > heap[big]) {
                    big = r;
                }
                if (big === i) {
                    break;
                }
                const t = heap[i];
                heap[i] = heap[big];
                heap[big] = t;
                i = big;
            }
        }
        return top;
    };
    let total = 0;
    for (const v of target) {
        total += v;
        push(v);
    }
    // Reverse simulation: the total strictly grows each operation, so the
    // largest element of any reachable state was necessarily written last.
    // `total` tracks the current array sum.
    for (;;) {
        const largest = pop();
        // Max is 1 => every other element (never larger) is also 1.
        if (largest === 1) {
            return true;
        }
        const rest = total - largest;
        // The last write must have exceeded the rest of the array; it
        // also catches rest == 0 before the division.
        if (largest <= rest) {
            return false;
        }
        // Batch-jump consecutive un-mixings of the same element in one
        // go: `steps` reversals leave largest mod rest biased to [1, rest],
        // avoiding one-rest-at-a-time subtraction on 1e9-scale gaps.
        const steps = Math.floor((largest - 1) / rest);
        const prev = largest - steps * rest;
        push(prev);
        total = rest + prev;
    }
}
