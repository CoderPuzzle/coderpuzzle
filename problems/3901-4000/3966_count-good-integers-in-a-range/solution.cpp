class Solution {
  public:
    long long goodIntegers(long long l, long long r, int k) { return countGood(r, k) - countGood(l - 1, k); }

  private:
    long long countGood(long long x, int k) {
        if (x < 0)
            return 0;
        string s = to_string(x);
        int n = (int)s.size();
        vector<int> digits(n);
        for (int i = 0; i < n; i++)
            digits[i] = s[i] - '0';
        // memo[pos][tight][prev+1][started]; prev index 0 = unused
        vector<vector<vector<vector<long long>>>> memo(
            n + 1, vector<vector<vector<long long>>>(2, vector<vector<long long>>(11, vector<long long>(2, -1))));
        return dp(0, 1, 0, 0, digits, k, memo);
    }

    long long dp(int pos, int tight, int prev, int started, const vector<int> &digits, int k,
                 vector<vector<vector<vector<long long>>>> &memo) {
        if (pos == (int)digits.size())
            return 1;
        long long &slot = memo[pos][tight][prev + 1][started];
        if (slot != -1)
            return slot;
        int limit = tight ? digits[pos] : 9;
        long long total = 0;
        for (int d = 0; d <= limit; d++) {
            int ntight = (tight && d == limit) ? 1 : 0;
            if (!started && d == 0) {
                total += dp(pos + 1, ntight, 0, 0, digits, k, memo);
            } else {
                if (started && abs(d - prev) > k)
                    continue;
                total += dp(pos + 1, ntight, d, 1, digits, k, memo);
            }
        }
        slot = total;
        return total;
    }
};
