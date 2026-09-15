class Solution {

    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 1; i <= n; ++i) {
            // value & (value - 1) clears the lowest set bit in one AND, so
            // the loop body runs exactly popcount(i) times — never once per
            // bit position.
            int count = 0;
            int value = i;
            while (value != 0) {
                value &= value - 1;
                count++;
            }
            ans[i] = count;
        }
        return ans;
    }
}
