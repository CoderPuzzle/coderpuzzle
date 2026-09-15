class Solution {
  public:
    static const long long MOD = 1000000007LL;

    int countNoZeroPairs(long long n) {
        vector<int> ds;
        long long x = n;
        if (x == 0)
            ds.push_back(0);
        while (x > 0) {
            ds.push_back((int)(x % 10));
            x /= 10;
        }
        ds.push_back(0);
        int length = (int)ds.size();

        // g[carry][a_active][b_active]
        long long g[2][2][2] = {};
        g[0][0][0] = 1;
        for (int pos = length - 1; pos >= 0; pos--) {
            long long ng[2][2][2] = {};
            for (int carry = 0; carry < 2; carry++) {
                for (int aa = 0; aa < 2; aa++) {
                    for (int ba = 0; ba < 2; ba++) {
                        long long res = 0;
                        for (int da = 0; da < 10; da++) {
                            if (aa == 0 && da != 0)
                                break;
                            for (int db = 0; db < 10; db++) {
                                if (ba == 0 && db != 0)
                                    break;
                                if (pos == 0 && (da == 0 || db == 0))
                                    continue;
                                int s = da + db + carry;
                                if (s % 10 != ds[pos])
                                    continue;
                                int nc = s / 10;
                                int naa = (aa == 1 && da != 0) ? 1 : 0;
                                int nba = (ba == 1 && db != 0) ? 1 : 0;
                                res += g[nc][naa][nba];
                            }
                        }
                        ng[carry][aa][ba] = res % MOD;
                    }
                }
            }
            memcpy(g, ng, sizeof(g));
        }
        return (int)g[0][1][1];
    }
};
