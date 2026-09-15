function minCost(nums: number[]): number {
    // Every operation removes two of the three frontmost elements, so
    // what remains is always an untouched suffix plus at most one
    // element left behind in front of it. Row j holds, at index c + 1,
    // the cheapest finish when nums[c] is that leftover (index 0 =
    // no leftover); computing row j reads only rows j + 2 and j + 3,
    // so a three-row ring bounds the table at O(n) memory. Costs sum
    // to at most 5 * 10^8, exact as a plain number.
    const n = nums.length;
    if (n < 3) {
        return Math.max(nums[0], nums[n - 1]);
    }

    const rowN: number[] = [0].concat(nums);
    const rowNm1: number[] = [nums[n - 1]];
    for (let c = 0; c < n - 1; c++) {
        rowNm1.push(Math.max(nums[c], nums[n - 1]));
    }
    const rowNm2: number[] = [Math.max(nums[n - 2], nums[n - 1])];
    for (let c = 0; c < n - 2; c++) {
        const a = nums[c];
        const b = nums[n - 2];
        const d = nums[n - 1];
        rowNm2.push(Math.min(Math.max(a, b) + d, Math.max(a, d) + b, Math.max(b, d) + a));
    }

    let ring: number[][] = [rowNm2, rowNm1, rowN];
    for (let j = n - 3; j >= 0; j--) {
        const r2 = ring[1];
        const r3 = ring[2];
        const a = nums[j];
        const b = nums[j + 1];
        const pair = Math.max(a, b);
        // No leftover: nums[j], nums[j+1], nums[j+2] meet one
        // operation and the survivor becomes the next leftover.
        const row: number[] = [
            Math.min(Math.max(b, nums[j + 2]) + r3[j + 1], Math.max(a, nums[j + 2]) + r3[j + 2], pair + r3[j + 3]),
        ];
        // With leftover nums[c]: the front three are nums[c], a, b.
        const k1 = r2[j + 2];
        const k2 = r2[j + 1];
        for (let c = 0; c < j; c++) {
            const v = nums[c];
            row.push(Math.min(Math.max(v, a) + k1, Math.max(v, b) + k2, pair + r2[c + 1]));
        }
        ring = [row, ring[0], ring[1]];
    }
    return ring[0][0];
}
