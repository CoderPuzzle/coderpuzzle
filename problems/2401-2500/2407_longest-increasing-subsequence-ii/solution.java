class Solution {

    public int lengthOfLIS(int[] nums, int k) {
        // Max segment tree indexed by VALUE: leaf v holds the longest
        // valid subsequence seen so far that ends with value v. The
        // left-to-right scan keeps index order for free.
        int size = 1;
        while (size <= 100000) {
            size *= 2;
        }
        int[] tree = new int[2 * size];
        int answer = 0;
        for (int x : nums) {
            // Predecessor must be a strictly smaller value within k, so
            // query [max(1, x-k), x-1]; extend the best of them by one.
            int current = query(tree, size, Math.max(1, x - k), x - 1) + 1;
            // Climb from the leaf and stop once an ancestor is already
            // >= current: a shorter subsequence never overwrites a longer.
            int i = x + size;
            while (i >= 1 && tree[i] < current) {
                tree[i] = current;
                i /= 2;
            }
            answer = Math.max(answer, current);
        }
        return answer;
    }

    private int query(int[] tree, int size, int left, int right) {
        int best = 0;
        int lo = left + size;
        int hi = right + size + 1;
        while (lo < hi) {
            if ((lo & 1) == 1) {
                best = Math.max(best, tree[lo]);
                lo++;
            }
            if ((hi & 1) == 1) {
                hi--;
                best = Math.max(best, tree[hi]);
            }
            lo /= 2;
            hi /= 2;
        }
        return best;
    }
}
