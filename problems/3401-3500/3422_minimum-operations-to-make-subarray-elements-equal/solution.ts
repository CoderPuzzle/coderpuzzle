function minOperations(nums: number[], k: number): number {
    // Equalizing a window costs sum(|x - t|), minimized at a median t. The
    // window slides over two min-heap halves -- low holds negated keys, high
    // raw keys -- with running half-sums making each window's cost O(1).
    // Keys pack (v + 2^20) * 2^17 + index, so they never tie, max(low) <
    // min(high) strictly, and a leaving element routes to its true half by
    // one comparison; deletion is lazy, dropping stale copies at heap tops.
    // Arithmetic packing, not shifts: JS bitwise ops coerce to 32 bits and
    // the key needs 38. Multiplication and modulo on doubles stay exact
    // below 2^53, as do the costs (under 2 * 10^11).
    const push = (h: number[], x: number): void => {
        h.push(x);
        let c = h.length - 1;
        while (c > 0) {
            const p = (c - 1) >> 1;
            if (h[p] <= h[c]) {
                break;
            }
            [h[p], h[c]] = [h[c], h[p]];
            c = p;
        }
    };
    const pop = (h: number[]): number => {
        const top = h[0];
        const last = h.pop()!;
        if (h.length) {
            h[0] = last;
            let c = 0;
            for (;;) {
                let m = c;
                const l = 2 * c + 1;
                const r = l + 1;
                if (l < h.length && h[l] < h[m]) {
                    m = l;
                }
                if (r < h.length && h[r] < h[m]) {
                    m = r;
                }
                if (m === c) {
                    break;
                }
                [h[m], h[c]] = [h[c], h[m]];
                c = m;
            }
        }
        return top;
    };
    const key = (v: number, i: number): number => (v + 1048576) * 131072 + i;
    const val = (key_: number): number => Math.floor(key_ / 131072) - 1048576;
    const idx = (key_: number): number => key_ % 131072;

    const low: number[] = [];
    const high: number[] = [];
    const delayed = new Uint8Array(nums.length);
    let lowSize = 0;
    let highSize = 0;
    let lowSum = 0;
    let highSum = 0;

    const pruneLow = (): void => {
        while (low.length && delayed[idx(-low[0])]) {
            delayed[idx(-low[0])] = 0;
            pop(low);
        }
    };
    const pruneHigh = (): void => {
        while (high.length && delayed[idx(high[0])]) {
            delayed[idx(high[0])] = 0;
            pop(high);
        }
    };

    let best = Infinity;
    for (let i = 0; i < nums.length; i++) {
        if (i >= k) {
            const outKey = key(nums[i - k], i - k);
            delayed[i - k] = 1;
            if (outKey <= -low[0]) {
                lowSize--;
                lowSum -= nums[i - k];
            } else {
                highSize--;
                highSum -= nums[i - k];
            }
        }
        const key_ = key(nums[i], i);
        // During slides low may sit empty (its whole half just left), but
        // the stale top still bounds the half: route by comparison alone.
        if ((lowSize === 0 && highSize === 0) || key_ <= -low[0]) {
            push(low, -key_);
            lowSize++;
            lowSum += nums[i];
        } else {
            push(high, key_);
            highSize++;
            highSum += nums[i];
        }
        if (lowSize > highSize + 1) {
            pruneLow();
            const move = -pop(low);
            lowSize--;
            lowSum -= val(move);
            push(high, move);
            highSize++;
            highSum += val(move);
        } else if (lowSize < highSize) {
            pruneHigh();
            const move = pop(high);
            highSize--;
            highSum -= val(move);
            push(low, -move);
            lowSize++;
            lowSum += val(move);
        }
        if (i >= k - 1) {
            pruneLow();
            pruneHigh();
            const median = val(-low[0]);
            const cost = median * lowSize - lowSum + (highSum - median * highSize);
            if (cost < best) {
                best = cost;
            }
        }
    }
    return best;
}
