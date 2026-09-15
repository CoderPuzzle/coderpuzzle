class Solution {

    public int maximumStrongPairXor(int[] nums) {
        // Sorted sweep with a sliding window [ceil(y/2), y]: a binary trie
        // over the 20 value bits, each node carrying a count of live window
        // values, answers "best XOR partner of y in the window" greedily.
        // The left pointer retires values whose doubling falls below y.
        java.util.Arrays.sort(nums);
        final int BITS = 20; // nums[i] <= 2^20 - 1
        int[][] child = new int[20 * nums.length + 1][2];
        int[] cnt = new int[20 * nums.length + 1];
        int nodes = 1;
        int best = 0;
        int left = 0;
        for (int y : nums) {
            // insert y
            int node = 0;
            for (int b = BITS - 1; b >= 0; --b) {
                int d = (y >>> b) & 1;
                int nxt = child[node][d];
                if (nxt == 0) {
                    nxt = nodes++;
                    child[node][d] = nxt;
                }
                node = nxt;
                ++cnt[node];
            }
            // retire x from the left while 2 * x < y
            while (2 * nums[left] < y) {
                int x = nums[left];
                int node2 = 0;
                for (int b = BITS - 1; b >= 0; --b) {
                    node2 = child[node2][(x >>> b) & 1];
                    --cnt[node2];
                }
                ++left;
            }
            // query: prefer the opposite bit while that subtree is live
            int node3 = 0;
            int res = 0;
            for (int b = BITS - 1; b >= 0; --b) {
                int d = (y >>> b) & 1;
                int want = child[node3][d ^ 1];
                if (want != 0 && cnt[want] > 0) {
                    res |= 1 << b;
                    node3 = want;
                } else {
                    node3 = child[node3][d];
                }
            }
            best = Math.max(best, res);
        }
        return best;
    }
}
