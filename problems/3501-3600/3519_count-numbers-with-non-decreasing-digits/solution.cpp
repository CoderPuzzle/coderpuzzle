class Solution {
  public:
    static const long long MOD = 1000000007LL;

    string stripZero(string s) {
        size_t i = 0;
        while (i + 1 < s.size() && s[i] == '0')
            i++;
        return s.substr(i);
    }

    string decStr(const string &s) {
        bool allZero = true;
        for (char ch : s)
            if (ch != '0') {
                allZero = false;
                break;
            }
        if (allZero)
            return "";
        string c = s;
        int i = (int)c.size() - 1;
        while (i >= 0) {
            if (c[i] > '0') {
                c[i]--;
                break;
            }
            c[i] = '9';
            i--;
        }
        return stripZero(c);
    }

    vector<int> toBase(const string &s0, int b) {
        string s = stripZero(s0);
        vector<int> digits;
        while (s != "0") {
            int carry = 0;
            string ns;
            for (char ch : s) {
                int v = carry * 10 + (ch - '0');
                ns.push_back((char)('0' + v / b));
                carry = v % b;
            }
            digits.push_back(carry);
            s = stripZero(ns);
        }
        if (digits.empty())
            return vector<int>{0};
        reverse(digits.begin(), digits.end());
        return digits;
    }

    long long countUpTo(const string &s, int b) {
        vector<int> digits = toBase(s, b);
        int m = (int)digits.size();
        // g[pos][last][tight][started]
        vector<vector<array<array<long long, 2>, 2>>> g(m + 1, vector<array<array<long long, 2>, 2>>(b));
        for (int last = 0; last < b; last++)
            for (int tight = 0; tight < 2; tight++)
                for (int started = 0; started < 2; started++)
                    g[m][last][tight][started] = 1;
        for (int pos = m - 1; pos >= 0; pos--) {
            for (int last = 0; last < b; last++) {
                for (int tight = 0; tight < 2; tight++) {
                    for (int started = 0; started < 2; started++) {
                        int limit = (tight == 1) ? digits[pos] : b - 1;
                        long long res = 0;
                        for (int d = 0; d <= limit; d++) {
                            int nt = (tight == 1 && d == limit) ? 1 : 0;
                            if (started == 0) {
                                if (d == 0)
                                    res += g[pos + 1][0][nt][0];
                                else
                                    res += g[pos + 1][d][nt][1];
                            } else if (d >= last) {
                                res += g[pos + 1][d][nt][1];
                            }
                        }
                        g[pos][last][tight][started] = res % MOD;
                    }
                }
            }
        }
        return g[0][0][1][0];
    }

    int countNumbers(string l, string r, int b) {
        string d = decStr(l);
        long long below = d.empty() ? 0 : countUpTo(d, b);
        long long ans = ((countUpTo(r, b) - below) % MOD + MOD) % MOD;
        return (int)ans;
    }
};
