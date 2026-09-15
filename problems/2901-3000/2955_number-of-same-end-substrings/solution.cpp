class Solution {
  public:
    vector<int> sameEndSubstringCount(string s, vector<vector<int>> &queries) {
        // cnt[c][j] = occurrences of letter c in s[:j]. A query answer is
        // the sum over letters of t*(t+1)/2 for the range frequency t: every
        // position pairs with itself, and each equal pair of positions is
        // one same-end substring. Max answer 450015000 fits in 32 bits.
        int n = (int)s.size();
        vector<vector<int>> cnt(26, vector<int>(n + 1, 0));
        for (int j = 1; j <= n; ++j) {
            for (int c = 0; c < 26; ++c) {
                cnt[c][j] = cnt[c][j - 1];
            }
            ++cnt[s[j - 1] - 'a'][j];
        }
        vector<int> ans;
        ans.reserve(queries.size());
        for (const auto &q : queries) {
            int l = q[0], r = q[1];
            int total = 0;
            for (int c = 0; c < 26; ++c) {
                int t = cnt[c][r + 1] - cnt[c][l];
                total += t * (t + 1) / 2;
            }
            ans.push_back(total);
        }
        return ans;
    }
};
