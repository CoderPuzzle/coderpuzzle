// Min-heap of nums values of currently chosen clearances, sifted by hand:
// values stay at or below 1e9 and sums at n * 1e9, both exact in IEEE
// doubles.
function siftUp(bank: number[], i: number): void {
    while (i > 0) {
        const p = (i - 1) >> 1;
        if (bank[p] <= bank[i]) {
            break;
        }
        [bank[p], bank[i]] = [bank[i], bank[p]];
        i = p;
    }
}

function siftDown(bank: number[], i: number): void {
    for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < bank.length && bank[l] < bank[m]) {
            m = l;
        }
        if (r < bank.length && bank[r] < bank[m]) {
            m = r;
        }
        if (m === i) {
            break;
        }
        [bank[m], bank[i]] = [bank[i], bank[m]];
        i = m;
    }
}

function earliestSecondToMarkIndices(nums: number[], changeIndices: number[]): number {
    const n = nums.length;

    // Binary search the horizon: finishing within t seconds also finishes
    // within t + 1.
    const canFinish = (t: number): boolean => {
        // Fewer seconds than indices can never mark them all.
        if (t < n) {
            return false;
        }
        // First occurrence of every index within [1, t]: clearing at the
        // earliest chance dominates any later pin, since an earlier
        // set-second only relaxes where the mark may land.
        const first = new Map<number, number>();
        for (let s = 0; s < t; ++s) {
            if (!first.has(changeIndices[s])) {
                first.set(changeIndices[s], s + 1);
            }
        }
        const deadlines = [...first.values()].sort((a, b) => b - a);
        // Sweep pinned seconds latest to earliest, banking each clearance's
        // saving of nums[v] - 1 (one set-op replaces the whole decrement
        // chain). Every suffix of chosen clearances needs distinct marks
        // after its deadline outside its own pins, capping the suffix at
        // half the window 2 * chosen <= t - f + 1; on a breach give back
        // the banked clearance with the smallest saving.
        const bank: number[] = [];
        let saved = 0;
        let chosen = 0;
        for (const f of deadlines) {
            const c = nums[changeIndices[f - 1] - 1];
            if (c < 2) {
                continue;
            }
            bank.push(c);
            siftUp(bank, bank.length - 1);
            saved += c - 1;
            ++chosen;
            while (2 * chosen > t - f + 1) {
                saved -= bank[0] - 1;
                bank[0] = bank[bank.length - 1];
                bank.pop();
                siftDown(bank, 0);
                --chosen;
            }
        }
        // Uncleared indices keep their decrement chains; the surviving work
        // plus one mark per index must fit into [1, t].
        let total = n;
        for (const x of nums) {
            total += x;
        }
        return total - saved <= t;
    };

    let lo = 1;
    let hi = changeIndices.length;
    if (!canFinish(hi)) {
        return -1;
    }
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (canFinish(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
