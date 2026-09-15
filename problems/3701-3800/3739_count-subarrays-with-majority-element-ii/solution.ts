function countMajoritySubarrays(nums: number[], target: number): number {
    // A subarray holds target as its majority element exactly when target
    // outnumbers everything else in it, so score each element +1 when it
    // equals target and -1 otherwise: the subarray qualifies precisely when
    // its score sum is positive. With pref[0] = 0 and pref[k] =
    // pref[k - 1] + the score of nums[k - 1], the task becomes counting
    // pairs i < j with pref[i] < pref[j].
    //
    // Sweep the prefixes with a Fenwick tree over the value range: scores
    // move the prefix one step either way, so every prefix lies in [-n, n]
    // and an offset maps it onto 1..2n + 1 with no compression needed. Each
    // position is queried before it is inserted, which keeps i < j
    // automatic; the strictness skips tied prefixes — windows where target
    // fills exactly half and does not count as a majority. The answer
    // reaches n(n + 1) / 2, past 32 bits at this n; JavaScript numbers stay
    // exact far beyond that.
    const n = nums.length;
    const size = 2 * n + 1;
    const tree: number[] = new Array(size + 1).fill(0);
    // Seed the tree with pref[0] = 0, stored at index n + 1.
    for (let index = n + 1; index <= size; index += index & -index) {
        tree[index]++;
    }
    let pref = 0;
    let answer = 0;
    for (const x of nums) {
        pref += x === target ? 1 : -1;
        // Earlier prefixes strictly below pref sit at indices <= pref + n.
        for (let index = pref + n; index > 0; index &= index - 1) {
            answer += tree[index];
        }
        // Insert pref at index pref + n + 1.
        for (let index = pref + n + 1; index <= size; index += index & -index) {
            tree[index]++;
        }
    }
    return answer;
}
