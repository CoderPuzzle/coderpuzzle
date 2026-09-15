function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
    let best: number[] = [];
    // Try every split of the k digits between the two arrays and keep the
    // best merged candidate; the answer is the max over all splits.
    for (let take1 = 0; take1 <= nums1.length; ++take1) {
        const take2 = k - take1;
        if (take2 < 0 || take2 > nums2.length) continue;
        const candidate = merge(maxSubsequence(nums1, take1), maxSubsequence(nums2, take2));
        if (larger(candidate, best)) best = candidate;
    }
    return best;
}

function maxSubsequence(nums: number[], t: number): number[] {
    // Monotonic stack: while digits can still be dropped, pop any smaller
    // digit in front of a larger newcomer, then keep the first t digits.
    const stack: number[] = [];
    let drop = nums.length - t;
    for (const num of nums) {
        while (drop > 0 && stack.length > 0 && stack[stack.length - 1] < num) {
            stack.pop();
            drop--;
        }
        stack.push(num);
    }
    return stack.slice(0, t);
}

function merge(a: number[], b: number[]): number[] {
    const merged: number[] = [];
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
        // Equal heads are decided by comparing the tails that follow.
        if (greater(a, i, b, j)) {
            merged.push(a[i]);
            i++;
        } else {
            merged.push(b[j]);
            j++;
        }
    }
    return merged.concat(a.slice(i), b.slice(j));
}

function greater(a: number[], i: number, b: number[], j: number): boolean {
    // Is a[i:] the larger remaining sequence? Skip the equal prefix first;
    // whichever tail runs out (or holds the smaller digit) loses the tie.
    while (i < a.length && j < b.length && a[i] === b[j]) {
        i++;
        j++;
    }
    return j === b.length || (i < a.length && a[i] > b[j]);
}

function larger(a: number[], b: number[]): boolean {
    // Fixed-length digit order: the first differing position decides.
    for (let i = 0; i < a.length && i < b.length; ++i) {
        if (a[i] !== b[i]) return a[i] > b[i];
    }
    return a.length > b.length;
}
