class Solution {

    private static final int MOD = 1_000_000_007;

    // A query (x, y) sums the stride x, x+y, x+2y, ... — O(n/y) per query
    // when walked directly, which stays cheap only for large y. Split the
    // queries on B ~ sqrt(n): every y <= B gets a residue table pre[y]
    // built right-to-left with pre[y][i] = (nums[i] + pre[y][i+y]) % MOD,
    // making each such query one lookup, while any y > B strides at most
    // n/B ~ B indices. A full suffix sums to 5*10^4 * 10^9 = 5*10^13
    // before the modulus, so accumulation runs in 64 bits and table rows
    // store plain 32-bit mod values.
    public int[] solve(int[] nums, int[][] queries) {
        int n = nums.length;
        int limit = (int) Math.sqrt(n);
        int[][] pre = new int[limit + 1][];
        for (int y = 1; y <= limit; ++y) {
            int[] row = new int[n];
            for (int i = n - 1; i >= 0; --i) {
                long tail = i + y < n ? row[i + y] : 0;
                row[i] = (int) ((nums[i] + tail) % MOD);
            }
            pre[y] = row;
        }
        int[] answer = new int[queries.length];
        for (int q = 0; q < queries.length; ++q) {
            int x = queries[q][0];
            int y = queries[q][1];
            if (y <= limit) {
                answer[q] = pre[y][x];
            } else {
                long total = 0;
                for (int j = x; j < n; j += y) {
                    total += nums[j];
                }
                answer[q] = (int) (total % MOD);
            }
        }
        return answer;
    }
}
