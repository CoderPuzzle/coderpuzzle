class Solution {

    public int zigZagArrays(int n, int l, int r) {
        final long MOD = 1_000_000_007;
        int m = r - l + 1;
        // up[x] / down[x]: length-i arrays ending at value x whose last step
        // rose / fell. Every single value starts both tables at length 1;
        // the zigzag law then forces each next step to flip direction.
        long[] up = new long[m],
            down = new long[m];
        for (int i = 0; i < m; i++) {
            up[i] = 1;
            down[i] = 1;
        }
        for (int len = 2; len <= n; len++) {
            // A rising-ending array may only continue onto a smaller value,
            // so new down[y] sums up[x] over x > y -- a running suffix
            // total.
            long[] newDown = new long[m],
                newUp = new long[m];
            long total = 0;
            for (int y = m - 1; y >= 0; y--) {
                newDown[y] = total;
                total = (total + up[y]) % MOD;
            }
            // Mirror image: new up[y] sums down[x] over x < y.
            total = 0;
            for (int y = 0; y < m; y++) {
                newUp[y] = total;
                total = (total + down[y]) % MOD;
            }
            up = newUp;
            down = newDown;
        }
        long answer = 0;
        for (int x = 0; x < m; x++) {
            answer += up[x] + down[x];
        }
        return (int) (answer % MOD);
    }
}
