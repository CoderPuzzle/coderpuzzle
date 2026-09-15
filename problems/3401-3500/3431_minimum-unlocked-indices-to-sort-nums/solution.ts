function minUnlockedIndices(nums: number[], locked: number[]): number {
    // A swap only exchanges values differing by exactly 1, so a 1 and a 3
    // can never trade places: any 3 sitting before a 1 dooms the array.
    // Otherwise 1s only ever move left and 3s only ever move right, and
    // every swap they need lands on a boundary between the first 2 and
    // the last 1, or between the first 3 and the last 2.
    const n = nums.length;
    let first2 = n;
    let first3 = n;
    let last1 = -1;
    let last2 = -1;
    for (let i = 0; i < n; i++) {
        const v = nums[i];
        if (v === 1) {
            last1 = i;
        } else if (v === 2) {
            if (i < first2) {
                first2 = i;
            }
            last2 = i;
        } else if (i < first3) {
            first3 = i;
        }
    }
    if (first3 < last1) {
        return -1;
    }
    let total = 0;
    for (let i = 0; i < n; i++) {
        if (locked[i] && ((first2 <= i && i < last1) || (first3 <= i && i < last2))) {
            total++;
        }
    }
    return total;
}
