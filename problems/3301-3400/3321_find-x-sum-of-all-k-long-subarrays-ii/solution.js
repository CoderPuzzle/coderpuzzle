/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function (nums, k, x) {
    // TOP is a min-heap and REST a max-heap of [count, value] snapshots
    // of the live distinct values: TOP's peek is the worst kept pair,
    // REST's peek the best dropped one. Each slide moves at most two
    // pairs between the heaps, and `total` follows every membership
    // change, so one O(n log n) pass answers every window; stale
    // snapshots are skipped on peek and popped when surfaced. Kept sums
    // reach k * 10^9 = 10^14 < 2^53, so Number stays exact.
    const TOP = 0;
    const REST = 1;
    const freq = new Map();
    const topHeap = makeHeap((a, b) => (a[0] !== b[0] ? a[0] < b[0] : a[1] < b[1]));
    const restHeap = makeHeap((a, b) => (a[0] !== b[0] ? a[0] > b[0] : a[1] > b[1]));
    const membership = new Map(); // count,value key -> TOP | REST
    let topSize = 0;
    let total = 0;
    const answer = [];

    const keyOf = (count, value) => count * 2000000001 + value; // < 2^53

    const peekTop = () => {
        while (topHeap.a.length) {
            const p = topHeap.a[0];
            if (freq.get(p[1]) === p[0] && membership.get(keyOf(p[0], p[1])) === TOP) return p;
            heapPop(topHeap);
        }
        return null;
    };

    const peekRest = () => {
        while (restHeap.a.length) {
            const p = restHeap.a[0];
            if (freq.get(p[1]) === p[0] && membership.get(keyOf(p[0], p[1])) === REST) return p;
            heapPop(restHeap);
        }
        return null;
    };

    const erase = (count, value) => {
        if (membership.get(keyOf(count, value)) !== TOP) {
            membership.delete(keyOf(count, value));
            return;
        }
        membership.delete(keyOf(count, value));
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

    const place = (count, value) => {
        const p = [count, value];
        if (topSize < x) {
            membership.set(keyOf(count, value), TOP);
            heapPush(topHeap, p);
            topSize++;
            total += count * value;
            return;
        }
        const worst = peekTop();
        if (count > worst[0] || (count === worst[0] && value > worst[1])) {
            // the newcomer beats the worst kept pair: swap them
            membership.set(keyOf(worst[0], worst[1]), REST);
            heapPush(restHeap, worst);
            total -= worst[0] * worst[1];
            topSize--;
            membership.set(keyOf(count, value), TOP);
            heapPush(topHeap, p);
            topSize++;
            total += count * value;
        } else {
            membership.set(keyOf(count, value), REST);
            heapPush(restHeap, p);
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
            let old = freq.get(leaving);
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
};

// Array-backed binary heap with a caller-supplied strict-weak "less".
function makeHeap(less) {
    return { a: [], less };
}

function heapPush(heap, value) {
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

function heapPop(heap) {
    const a = heap.a;
    const top = a[0];
    const last = a.pop();
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
