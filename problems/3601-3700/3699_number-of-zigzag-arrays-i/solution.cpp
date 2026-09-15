class Solution {
  public:
    int zigZagArrays(int n, int l, int r) {
        const long long MOD = 1e9 + 7;
        int m = r - l + 1;
        // up[x] / down[x]: length-i arrays ending at value x whose last step
        // rose / fell. Every single value starts both tables at length 1;
        // the zigzag law then forces each next step to flip direction.
        vector<long long> up(m, 1), down(m, 1);
        for (int len = 2; len <= n; ++len) {
            // A rising-ending array may only continue onto a smaller value,
            // so new down[y] sums up[x] over x > y -- a running suffix
            // total.
            vector<long long> new_down(m), new_up(m);
            long long total = 0;
            for (int y = m - 1; y >= 0; --y) {
                new_down[y] = total;
                total = (total + up[y]) % MOD;
            }
            // Mirror image: new up[y] sums down[x] over x < y.
            total = 0;
            for (int y = 0; y < m; ++y) {
                new_up[y] = total;
                total = (total + down[y]) % MOD;
            }
            up = move(new_up);
            down = move(new_down);
        }
        long long answer = 0;
        for (int x = 0; x < m; ++x) {
            answer += up[x] + down[x];
        }
        return static_cast<int>(answer % MOD);
    }
};
