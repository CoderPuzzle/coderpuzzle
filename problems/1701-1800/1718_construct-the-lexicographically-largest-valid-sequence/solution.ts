function constructDistancedSequence(n: number): number[] {
    // The target holds 1 once and every i >= 2 twice, exactly i apart.
    // Filling the first empty cell left to right while trying values n
    // down to 1 attempts prefixes in decreasing lexicographic
    // preference: a value is abandoned only when no valid completion
    // extends it, so the first complete sequence found is the
    // lexicographically largest.
    const length = 2 * n - 1;
    const result: number[] = new Array(length).fill(0);
    const used: boolean[] = new Array(n + 1).fill(false);
    const fill = (pos: number): boolean => {
        if (pos === length) {
            return true;
        }
        if (result[pos] !== 0) {
            return fill(pos + 1);
        }
        for (let value = n; value >= 1; value--) {
            if (used[value]) {
                continue;
            }
            if (value === 1) {
                result[pos] = 1;
                used[1] = true;
                if (fill(pos + 1)) {
                    return true;
                }
                used[1] = false;
                result[pos] = 0;
            } else if (pos + value < length && result[pos + value] === 0) {
                result[pos] = value;
                result[pos + value] = value;
                used[value] = true;
                if (fill(pos + 1)) {
                    return true;
                }
                used[value] = false;
                result[pos] = 0;
                result[pos + value] = 0;
            }
        }
        return false;
    };
    fill(0);
    return result;
}
