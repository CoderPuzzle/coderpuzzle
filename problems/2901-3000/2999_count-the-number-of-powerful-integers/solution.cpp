class Solution {
  public:
    long long numberOfPowerfulInt(long long start, long long finish, int limit, string s) {
        return countPowerful(finish, limit, s) - countPowerful(start - 1, limit, s);
    }

  private:
    long long countPowerful(long long x, int limit, const string &s) {
        if (x <= 0)
            return 0;
        int n = (int)to_string(x).size();
        int lenS = (int)s.size();
        if (lenS > n)
            return 0;
        long long sv = stoll(s);
        if (x < sv)
            return 0;
        long long pow = pow10(lenS);
        long long cap = (x - sv) / pow;
        long long total = 1; // the number s itself (empty prefix)
        for (int p = 1; p <= n - lenS; p++) {
            total += countExactLen(p, cap, limit);
        }
        return total;
    }

    // number of integers with exactly p digits, every digit <= lim, <= cap
    long long countExactLen(int p, long long cap, int lim) {
        if (cap < pow10(p - 1))
            return 0;
        if (cap >= pow10(p) - 1) {
            long long res = lim;
            for (int i = 0; i < p - 1; i++)
                res *= (lim + 1);
            return res;
        }
        string str = to_string(cap);
        vector<int> capDigits(p);
        for (int i = 0; i < p; i++)
            capDigits[i] = str[i] - '0';

        vector<vector<long long>> memo(p + 1, vector<long long>(2, -1));
        return dp(0, 1, p, capDigits, lim, memo);
    }

    long long dp(int pos, int tight, int p, const vector<int> &capDigits, int lim, vector<vector<long long>> &memo) {
        if (pos == p)
            return 1;
        if (memo[pos][tight] >= 0)
            return memo[pos][tight];
        int up = tight == 1 ? capDigits[pos] : 9;
        int lo = pos == 0 ? 1 : 0;
        long long total = 0;
        int hi = min(up, lim);
        for (int d = lo; d <= hi; d++) {
            total += dp(pos + 1, (tight == 1 && d == up) ? 1 : 0, p, capDigits, lim, memo);
        }
        memo[pos][tight] = total;
        return total;
    }

    long long pow10(int e) {
        long long r = 1;
        for (int i = 0; i < e; i++)
            r *= 10;
        return r;
    }
};
