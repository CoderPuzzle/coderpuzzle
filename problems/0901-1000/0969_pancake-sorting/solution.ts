function pancakeSort(arr: number[]): number[] {
    // The pinned answer is a selection sort from the largest value down.
    // For each size s, the unsorted prefix a[0..s-1] still holds exactly
    // the values 1..s, so the value to place is the largest one present.
    // One flip brings it to the front (skipped when it already sits
    // there), the flip with k = s carries it to index s-1, where no later
    // flip — all of which reverse a strictly shorter prefix — can ever
    // reach it again. At most two flips per size, so at most 2*(n-1) in
    // all, well inside the 10*n acceptance bound.
    const a = [...arr];
    const flips: number[] = [];
    for (let size = a.length; size >= 2; --size) {
        let idx = 0;
        for (let i = 1; i < size; ++i) {
            if (a[i] > a[idx]) {
                idx = i;
            }
        }
        if (idx === size - 1) {
            continue;
        }
        if (idx !== 0) {
            flips.push(idx + 1);
            reversePrefix(a, idx + 1);
        }
        flips.push(size);
        reversePrefix(a, size);
    }
    return flips;
}

function reversePrefix(a: number[], k: number): void {
    for (let lo = 0, hi = k - 1; lo < hi; ++lo, --hi) {
        const tmp = a[lo];
        a[lo] = a[hi];
        a[hi] = tmp;
    }
}
