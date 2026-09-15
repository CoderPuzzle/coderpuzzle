function lengthOfLIS(nums: number[], k: number): number {
    // Max segment tree indexed by VALUE: leaf v holds the longest valid
    // subsequence seen so far that ends with value v.
    let size = 1;
    while (size <= 100000) {
        size *= 2;
    }
    const tree: number[] = new Array(2 * size).fill(0);
    const query = (left: number, right: number): number => {
        let best = 0;
        let lo = left + size;
        let hi = right + size + 1;
        while (lo < hi) {
            if (lo & 1) {
                best = Math.max(best, tree[lo]);
                lo++;
            }
            if (hi & 1) {
                hi--;
                best = Math.max(best, tree[hi]);
            }
            lo = Math.floor(lo / 2);
            hi = Math.floor(hi / 2);
        }
        return best;
    };
    let answer = 0;
    // Left-to-right scan keeps index order for free: when x arrives,
    // only earlier elements are in the tree.
    for (const x of nums) {
        // Predecessor must be a strictly smaller value within k, so
        // query [max(1, x-k), x-1]; extend the best of them by one.
        const current = query(Math.max(1, x - k), x - 1) + 1;
        // Climb from the leaf and stop once an ancestor is already
        // >= current: a shorter subsequence never overwrites a longer.
        for (let i = x + size; i >= 1 && tree[i] < current; i = Math.floor(i / 2)) {
            tree[i] = current;
        }
        answer = Math.max(answer, current);
    }
    return answer;
}
