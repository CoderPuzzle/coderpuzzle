function decompressRLElist(nums: number[]): number[] {
    // Read [freq, val] pairs two at a time; each pair appends freq copies of
    // val, so pairs concatenate in input order by construction.
    const out: number[] = [];
    for (let i = 0; i < nums.length; i += 2) {
        for (let k = 0; k < nums[i]; ++k) {
            out.push(nums[i + 1]);
        }
    }
    return out;
}
