class Solution {
  public:
    int countSteppingNumbers(string low, string high) {
        // Both counts are residues in [0, MOD), so the rebalanced difference
        // fits comfortably in an int.
        return ((countUpTo(high) - countUpTo(decrement(low))) % MOD + MOD) % MOD;
    }

  private:
    static constexpr int MOD = 1'000'000'007;

    // Stepping numbers in [1, bound], mod MOD; bound "0" gives 0.
    static int countUpTo(const string &bound) {
        if (bound == "0")
            return 0;
        int n = bound.size();
        // ways[m][d]: mod-count of ways to append m further digits after a
        // digit d, each differing by exactly 1 from its predecessor.
        vector<vector<int>> ways(n, vector<int>(10));
        ways[0].assign(10, 1);
        for (int m = 1; m < n; ++m) {
            for (int d = 0; d < 10; ++d) {
                int total = 0;
                if (d > 0)
                    total = ways[m - 1][d - 1];
                if (d < 9)
                    total += ways[m - 1][d + 1];
                ways[m][d] = total % MOD;
            }
        }
        int count = 0;
        // Every length below n: first digit 1..9 (no leading zero), then any
        // completion.
        for (int length = 1; length < n; ++length) {
            for (int d = 1; d <= 9; ++d) {
                count = (count + ways[length - 1][d]) % MOD;
            }
        }
        // Length n: walk the bound's digits under a tight flag. A smaller
        // digit at the first mismatching position settles the comparison; the
        // tail then completes in ways[n - 1 - i][choice] ways.
        int prev = -1;
        for (int i = 0; i < n; ++i) {
            int digit = bound[i] - '0';
            for (int choice = (i == 0 ? 1 : 0); choice < digit; ++choice) {
                if (prev < 0 || abs(choice - prev) == 1) {
                    count = (count + ways[n - 1 - i][choice]) % MOD;
                }
            }
            if (prev >= 0 && abs(digit - prev) != 1) {
                return count; // the equal-prefix chain is dead
            }
            prev = digit;
        }
        return (count + 1) % MOD; // the bound itself survived the walk
    }

    // value - 1 on a digit string (value >= 1); borrows turn 0s into 9s and
    // the collapsed leading digit is stripped.
    static string decrement(const string &value) {
        string digits = value;
        int i = digits.size() - 1;
        while (digits[i] == '0') {
            digits[i] = '9';
            --i;
        }
        digits[i] -= 1;
        int first = 0;
        while (first < (int)digits.size() - 1 && digits[first] == '0')
            ++first;
        return digits.substr(first);
    }
};
