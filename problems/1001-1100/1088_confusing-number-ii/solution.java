class Solution {

    public int confusingNumberII(int n) {
        // DFS over the valid digits (0,1,6,8,9; no leading zero), pruning
        // once the value exceeds n. The rotated value is carried
        // incrementally: appending digit d to a k-digit value shifts the
        // old rotation one place left and prepends rot180(d).
        int[] digits = { 0, 1, 6, 8, 9 };
        int[] rot = { 0, 1, -1, -1, -1, -1, 9, -1, 8, 6 };
        long[] pow10 = new long[11];
        pow10[0] = 1;
        for (int i = 1; i < 11; i++) pow10[i] = pow10[i - 1] * 10;
        return (int) dfs(0, 0, 0, n, digits, rot, pow10);
    }

    private long dfs(long cur, long rotated, int ndigits, long limit, int[] digits, int[] rot, long[] pow10) {
        if (cur > limit) return 0;
        long count = cur > 0 && rotated != cur ? 1 : 0;
        for (int d : digits) {
            if (cur == 0 && d == 0) continue;
            long nxt = cur * 10 + d;
            if (nxt <= limit) {
                count += dfs(nxt, rot[d] * pow10[ndigits] + rotated, ndigits + 1, limit, digits, rot, pow10);
            }
        }
        return count;
    }
}
