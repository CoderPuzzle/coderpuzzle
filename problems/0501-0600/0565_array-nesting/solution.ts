function arrayNesting(nums: number[]): number {
    // A permutation makes i -> nums[i] a graph where every node has
    // exactly one successor and one predecessor, so the array splits
    // into disjoint cycles; s[k] is exactly the cycle containing k, and
    // every member of that cycle generates the same-length set.
    const seen: boolean[] = new Array(nums.length).fill(false);
    let longest = 0;
    for (let start = 0; start < nums.length; ++start) {
        if (seen[start]) {
            continue;
        }
        let length = 0;
        let index = start;
        while (!seen[index]) {
            seen[index] = true;
            index = nums[index];
            ++length;
        }
        longest = Math.max(longest, length);
    }
    return longest;
}
