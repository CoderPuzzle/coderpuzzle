type Pair = [number, number];

interface Heap {
    a: Pair[];
    less: (x: Pair, y: Pair) => boolean;
}

function makeHeap(less: (x: Pair, y: Pair) => boolean): Heap {
    return { a: [], less };
}

function heapPush(heap: Heap, value: Pair): void {
    const a = heap.a;
    const less = heap.less;
    a.push(value);
    let i = a.length - 1;
    while (i > 0) {
        const parent = (i - 1) >> 1;
        if (!less(a[i], a[parent])) break;
        const tmp = a[i];
        a[i] = a[parent];
        a[parent] = tmp;
        i = parent;
    }
}

function heapPop(heap: Heap): Pair {
    const a = heap.a;
    const top = a[0];
    const last = a.pop()!;
    if (a.length) {
        a[0] = last;
        const less = heap.less;
        let i = 0;
        for (;;) {
            const l = 2 * i + 1;
            const r = l + 1;
            let best = i;
            if (l < a.length && less(a[l], a[best])) best = l;
            if (r < a.length && less(a[r], a[best])) best = r;
            if (best === i) break;
            const tmp = a[i];
            a[i] = a[best];
            a[best] = tmp;
            i = best;
        }
    }
    return top;
}

function findXSum(nums: number[], k: number, x: number): number[] {
    // TOP is a min-heap and REST a max-heap of (count, value) snapshots
    // of the live distinct values: TOP's peek is the worst kept pair,
    // REST's peek the best dropped one. Each slide moves at most two
    // pairs between the heaps, and `total` follows every membership
    // change, so one O(n log n) pass answers every window; stale
    // snapshots are skipped on peek and popped when surfaced. Kept sums
    // reach k * 10^9 = 10^14 < 2^53, so Number stays exact.
    const TOP = 0;
    const REST = 1;
    const freq = new Map<number, number>();
    const topHeap = makeHeap((a, b) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]));
    const restHeap = makeHeap((a, b) => (a[0] !== b[0] ? a[0] > b[0] : a[1] > b[1]));
    const membership = new Map<number, number>(); // count,value key -> TOP | REST
    let topSize = 0;
    let total = 0;
    const answer: number[] = [];

    const keyOf = (count: number, value: number): number => count * 2000000001 + value;

    const peekTop = (): Pair | null => {
        while (topHeap.a.length) {
            const p = topHeap.a[0];
            if (freq.get(p[1]) === p[0] && membership.get(keyOf(p[0], p[1])) === TOP) return p;
            heapPop(topHeap);
        }
        return null;
    };

    const peekRest = (): Pair | null => {
        while (restHeap.a.length) {
            const p = restHeap.a[0];
            if (freq.get(p[1]) === p[0] && membership.get(keyOf(p[0], p[1])) === REST) return p;
            heapPop(restHeap);
        }
        return null;
    };

    const erase = (count: number, value: number): void => {
        const key = keyOf(count, value);
        if (membership.get(key) !== TOP) {
            membership.delete(key);
            return;
        }
        membership.delete(key);
        topSize--;
        total -= count * value;
        // refill from the best of rest
        while (topSize < x) {
            const p = peekRest();
            if (p === null) break;
            heapPop(restHeap);
            membership.set(keyOf(p[0], p[1]), TOP);
            heapPush(topHeap, p);
            topSize++;
            total += p[0] * p[1];
        }
    };

    const place = (count: number, value: number): void => {
        const key = keyOf(count, value);
        if (topSize < x) {
            membership.set(key, TOP);
            heapPush(topHeap, [count, value]);
            topSize++;
            total += count * value;
            return;
        }
        const worst = peekTop()!;
        if (count > worst[0] || (count === worst[0] && value > worst[1])) {
            // the newcomer beats the worst kept pair: swap them
            membership.set(keyOf(worst[0], worst[1]), REST);
            heapPush(restHeap, worst);
            total -= worst[0] * worst[1];
            topSize--;
            membership.set(key, TOP);
            heapPush(topHeap, [count, value]);
            topSize++;
            total += count * value;
        } else {
            membership.set(key, REST);
            heapPush(restHeap, [count, value]);
        }
    };

    for (let i = 0; i < nums.length; ++i) {
        const value = nums[i];
        const count = freq.get(value) ?? 0;
        if (count) erase(count, value);
        freq.set(value, count + 1);
        place(count + 1, value);
        if (i >= k) {
            const leaving = nums[i - k];
            let old = freq.get(leaving)!;
            erase(old, leaving);
            old -= 1;
            freq.set(leaving, old);
            if (old) {
                // a count that just reached 0 leaves no pair behind
                place(old, leaving);
            }
        }
        if (i >= k - 1) answer.push(total);
    }
    return answer;
}
