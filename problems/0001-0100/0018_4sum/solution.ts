function fourSum(nums: number[], target: number): number[][] {
    // Sorted copy leaves the caller's array untouched; sorting makes every
    // emitted quadruplet ascending and the i-then-j scan lexicographic.
    const arr = [...nums].sort((a, b) => a - b);
    const n = arr.length;
    const result: number[][] = [];
    for (let i = 0; i + 3 < n; i++) {
        // Reusing the same value for the first slot would re-find the same
        // triples, so skip runs of equal values.
        if (i > 0 && arr[i] === arr[i - 1]) continue;
        for (let j = i + 1; j + 2 < n; j++) {
            // Same skip one level down, measured against j's own start.
            if (j > i + 1 && arr[j] === arr[j - 1]) continue;
            let left = j + 1,
                right = n - 1;
            while (left < right) {
                const total = arr[i] + arr[j] + arr[left] + arr[right];
                // Below target the sum must grow, so left moves right; above
                // target, right retreats.
                if (total < target) {
                    left++;
                } else if (total > target) {
                    right--;
                } else {
                    result.push([arr[i], arr[j], arr[left], arr[right]]);
                    // Both advance, then run past any runs of equal values, so
                    // the same pair is never emitted twice for one (i, j).
                    left++;
                    right--;
                    while (left < right && arr[left] === arr[left - 1]) left++;
                    while (left < right && arr[right] === arr[right + 1]) right--;
                }
            }
        }
    }
    return result;
}
