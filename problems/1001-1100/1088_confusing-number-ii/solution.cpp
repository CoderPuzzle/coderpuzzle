class Solution {
  public:
    int confusingNumberII(int n) {
        // DFS over the valid digits (0,1,6,8,9; no leading zero), pruning
        // once the value exceeds n. The rotated value is carried
        // incrementally: appending digit d to a k-digit value shifts the
        // old rotation one place left and prepends rot180(d).
        const int digits[] = {0, 1, 6, 8, 9};
        const int rot[] = {0, 1, -1, -1, -1, -1, 9, -1, 8, 6};
        long long pow10[11];
        pow10[0] = 1;
        for (int i = 1; i < 11; ++i)
            pow10[i] = pow10[i - 1] * 10;
        long long limit = n;
        int count = 0;
        function<void(long long, long long, int)> dfs = [&](long long cur, long long rotated, int ndigits) {
            if (cur > limit)
                return;
            if (cur > 0 && rotated != cur)
                ++count;
            for (int d : digits) {
                if (cur == 0 && d == 0)
                    continue;
                long long nxt = cur * 10 + d;
                if (nxt <= limit) {
                    dfs(nxt, rot[d] * pow10[ndigits] + rotated, ndigits + 1);
                }
            }
        };
        dfs(0, 0, 0);
        return count;
    }
};
