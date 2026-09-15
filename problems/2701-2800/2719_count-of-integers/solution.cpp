class Solution {
  public:
    int count(string num1, string num2, int min_sum, int max_sum) {
        const long long MOD = 1000000007LL;
        long long a = countRange(num2, min_sum, max_sum);
        long long b = countRange(decrement(num1), min_sum, max_sum);
        return (int)(((a - b) % MOD + MOD) % MOD);
    }

  private:
    long long countRange(const string &s, int minSum, int maxSum) {
        const long long MOD = 1000000007LL;
        int m = s.size();
        int ms = maxSum;
        vector<vector<long long>> dp(2, vector<long long>(ms + 1, 0));
        for (int sm = 0; sm <= ms; sm++) {
            long long v = sm >= minSum ? 1 : 0;
            dp[0][sm] = v;
            dp[1][sm] = v;
        }
        for (int pos = m - 1; pos >= 0; pos--) {
            int d0 = s[pos] - '0';
            vector<vector<long long>> ndp(2, vector<long long>(ms + 1, 0));
            for (int tight = 0; tight < 2; tight++) {
                int limit = tight == 1 ? d0 : 9;
                for (int sm = 0; sm <= ms; sm++) {
                    long long total = 0;
                    for (int d = 0; d <= limit; d++) {
                        int ns = sm + d;
                        if (ns > ms)
                            break;
                        int nt = (tight == 1 && d == limit) ? 1 : 0;
                        total += dp[nt][ns];
                    }
                    ndp[tight][sm] = total % MOD;
                }
            }
            dp = ndp;
        }
        return dp[1][0];
    }

    string decrement(const string &s) {
        string arr = s;
        int i = (int)arr.size() - 1;
        while (i >= 0 && arr[i] == '0') {
            arr[i] = '9';
            i--;
        }
        arr[i] -= 1;
        int j = 0;
        while (j < (int)arr.size() - 1 && arr[j] == '0')
            j++;
        return arr.substr(j);
    }
};
