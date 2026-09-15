class Solution {
  public:
    int interleaveCharacters(string a, string b, string t) {
        const int M = 1e9 + 7;
        int n = a.size(), m = b.size();
        vector<vector<int>> d(n + 1, vector<int>(m + 1));
        d[0][0] = 1;
        for (char ch : t) {
            vector<vector<int>> e(n + 1, vector<int>(m + 1));
            for (int j = 0; j <= m; j++) {
                long long run = 0;
                for (int i = 0; i <= n; i++) {
                    run = (run + d[i][j]) % M;
                    if (i < n && a[i] == ch)
                        e[i + 1][j] = (e[i + 1][j] + run) % M;
                }
            }
            for (int i = 0; i <= n; i++) {
                long long run = 0;
                for (int j = 0; j <= m; j++) {
                    run = (run + d[i][j]) % M;
                    if (j < m && b[j] == ch)
                        e[i][j + 1] = (e[i][j + 1] + run) % M;
                }
            }
            d.swap(e);
        }
        long long z = 0;
        for (auto &r : d)
            for (int x : r)
                z += x;
        auto sub = [&](string w) {
            vector<int> x(t.size() + 1);
            x[0] = 1;
            for (char c : w)
                for (int j = t.size() - 1; j >= 0; j--)
                    if (t[j] == c)
                        x[j + 1] = (x[j + 1] + x[j]) % M;
            return x.back();
        };
        return (z - sub(a) - sub(b) + 2LL * M) % M;
    }
};
