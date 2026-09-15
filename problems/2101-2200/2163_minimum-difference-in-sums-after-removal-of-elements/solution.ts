function minimumDifference(nums: number[]): number {
    const total = nums.length;
    const n = Math.floor(total / 3);

    // Generic binary heap helpers.
    const push = (h: number[], v: number, greater: (a: number, b: number) => boolean): void => {
        h.push(v);
        let c = h.length - 1;
        while (c > 0) {
            const p = (c - 1) >> 1;
            if (greater(h[c], h[p])) {
                const t = h[p];
                h[p] = h[c];
                h[c] = t;
                c = p;
            } else {
                break;
            }
        }
    };
    const pop = (h: number[], greater: (a: number, b: number) => boolean): number => {
        const top = h[0];
        const last = h.pop()!;
        if (h.length > 0) {
            h[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                if (l >= h.length) break;
                let m = l;
                if (l + 1 < h.length && greater(h[l + 1], h[l])) m = l + 1;
                if (greater(h[m], h[i])) {
                    const t = h[i];
                    h[i] = h[m];
                    h[m] = t;
                    i = m;
                } else {
                    break;
                }
            }
        }
        return top;
    };
    const gt = (a: number, b: number): boolean => a > b; // max-heap
    const lt = (a: number, b: number): boolean => a < b; // min-heap

    // left_min[i] = sum of the n smallest values among nums[0..i] (valid when i >= n-1)
    const leftMin: (number | null)[] = new Array(total).fill(null);
    let heap: number[] = [];
    let running = 0;
    for (let i = 0; i < total; i++) {
        const value = nums[i];
        push(heap, value, gt);
        running += value;
        if (heap.length > n) {
            running -= pop(heap, gt); // drop the largest kept
        }
        if (heap.length === n) {
            leftMin[i] = running;
        }
    }

    // right_max[i] = sum of the n largest values among nums[i..] (valid when total - i >= n)
    const rightMax: (number | null)[] = new Array(total).fill(null);
    let heap2: number[] = [];
    let running2 = 0;
    for (let i = total - 1; i >= 0; i--) {
        const value = nums[i];
        push(heap2, value, lt);
        running2 += value;
        if (heap2.length > n) {
            running2 -= pop(heap2, lt); // drop the smallest kept
        }
        if (heap2.length === n) {
            rightMax[i] = running2;
        }
    }

    let answer: number | null = null;
    for (let i = n - 1; i <= 2 * n - 1; i++) {
        const left = leftMin[i];
        const right = rightMax[i + 1];
        if (left !== null && right !== null) {
            const candidate = left - right;
            if (answer === null || candidate < answer) {
                answer = candidate;
            }
        }
    }
    return answer!;
}
