function maxNumOfMarkedIndices(nums: number[]): number {
    const a = nums.slice().sort((x, y) => x - y);
    const n = a.length;
    let i = 0;
    // Large partners must come from the upper half: with p pairs the smalls
    // are p elements of the lower part and the larges p of the upper, so j
    // starts at the midpoint.
    for (let j = Math.floor((n + 1) / 2); j < n; j++) {
        // Match in sorted order (exchange argument): pairing the smallest
        // remaining small with the smallest qualifying large never costs a
        // match, and i only advances on a successful pair.
        if (2 * a[i] <= a[j]) {
            i++;
        }
    }
    // i counts pairs; every pair marks two indices.
    return 2 * i;
}
