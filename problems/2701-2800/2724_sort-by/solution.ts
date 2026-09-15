class Solution {
    run(sortCase: SortCase): void {
        sortCase.check(this);
    }

    sortBy(arr: unknown[], fn: (value: any) => number): unknown[] {
        // Decorate once — call fn exactly n times and remember each
        // element's key — then sort a permutation of the original
        // indices by key, breaking ties by original index so equal keys
        // can never swap places: stable by construction, independent of
        // engine sort internals. The undecorate pass gathers the
        // elements the sorted permutation points back to.
        const keys = arr.map((value) => fn(value));
        const order = arr.map((_, index) => index).sort((i, j) => keys[i] - keys[j] || i - j);
        return order.map((index) => arr[index]);
    }
}
