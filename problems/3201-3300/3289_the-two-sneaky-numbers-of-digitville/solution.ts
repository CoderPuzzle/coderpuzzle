function getSneakyNumbers(nums: number[]): number[] {
    // Values all lie in 0..n-1, so a counter array indexed by value finds
    // the two count-2 entries; the ascending walk emits them in order.
    const n = nums.length - 2;
    const count: number[] = new Array(n).fill(0);
    for (const x of nums) {
        count[x]++;
    }
    const sneaky: number[] = [];
    for (let v = 0; v < n; v++) {
        if (count[v] === 2) {
            sneaky.push(v);
        }
    }
    return sneaky;
}
