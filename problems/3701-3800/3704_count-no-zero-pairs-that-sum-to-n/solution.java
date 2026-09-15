class Solution {

    private static final long MOD = 1000000007L;

    public int countNoZeroPairs(long n) {
        java.util.List<Integer> ds = new java.util.ArrayList<>();
        long x = n;
        if (x == 0) ds.add(0);
        while (x > 0) {
            ds.add((int) (x % 10));
            x /= 10;
        }
        ds.add(0);
        int length = ds.size();

        // g[carry][a_active][b_active]
        long[][][] g = new long[2][2][2];
        g[0][0][0] = 1;
        for (int pos = length - 1; pos >= 0; pos--) {
            long[][][] ng = new long[2][2][2];
            for (int carry = 0; carry < 2; carry++) {
                for (int aa = 0; aa < 2; aa++) {
                    for (int ba = 0; ba < 2; ba++) {
                        long res = 0;
                        for (int da = 0; da < 10; da++) {
                            if (aa == 0 && da != 0) break;
                            for (int db = 0; db < 10; db++) {
                                if (ba == 0 && db != 0) break;
                                if (pos == 0 && (da == 0 || db == 0)) continue;
                                int s = da + db + carry;
                                if (s % 10 != ds.get(pos)) continue;
                                int nc = s / 10;
                                int naa = aa == 1 && da != 0 ? 1 : 0;
                                int nba = ba == 1 && db != 0 ? 1 : 0;
                                res += g[nc][naa][nba];
                            }
                        }
                        ng[carry][aa][ba] = res % MOD;
                    }
                }
            }
            g = ng;
        }
        return (int) g[0][1][1];
    }
}
