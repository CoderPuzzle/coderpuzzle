function incremovableSubarrayCount(nums: number[]): number {
    // A removal [l, r] is incremovable iff the prefix nums[:l] and the
    // suffix nums[r+1:] are strictly increasing and the seam holds
    // (nums[l-1] < nums[r+1], unless one side is empty). Group removals
    // by kept prefix length p = l: the kept suffix must start at some
    // s >= p + 1 (non-empty removal) inside the maximal strictly
    // increasing suffix that starts at y, and its first value must
    // exceed nums[p - 1]. Since nums[0..x] (the maximal increasing
    // prefix) makes nums[p - 1] grow with p, the smallest valid s only
    // moves right, so one shared pointer sweeps the suffix once. The
    // count reaches n * (n + 1) / 2 = 5,000,050,000 for the sorted
    // array; that exceeds 2^31 but stays far below 2^53, so plain
    // Number arithmetic remains exact.
    const n = nums.length;
    let x = 0;
    while (x + 1 < n && nums[x] < nums[x + 1]) {
        x++;
    }
    let y = n - 1;
    while (y > 0 && nums[y - 1] < nums[y]) {
        y--;
    }
    let total = 0;
    let s = y;
    for (let p = 0; p <= x + 1; p++) {
        if (s < p + 1) {
            s = p + 1;
        }
        if (p > 0) {
            while (s < n && nums[s] <= nums[p - 1]) {
                s++;
            }
        }
        total += n - s + 1;
    }
    return total;
}
