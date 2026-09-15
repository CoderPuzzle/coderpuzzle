class Solution {
  public:
    int maximumLength(string s) {
        // At 5*10^5 characters only run-length structure matters: group
        // each character's run lengths, keep the top three, and take the
        // best of the three ways to place three windows.
        array<vector<int>, 26> runs;
        int n = s.size();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s[j] == s[i])
                j++;
            runs[s[i] - 'a'].push_back(j - i);
            i = j;
        }
        int best = -1;
        for (auto &rs : runs) {
            if (rs.empty())
                continue;
            sort(rs.begin(), rs.end(), greater<int>());
            int f1 = rs[0];
            int f2 = rs.size() > 1 ? rs[1] : 0;
            int f3 = rs.size() > 2 ? rs[2] : 0;
            // three windows in one run / two + one / one in each;
            // a 0 candidate means this character never reaches three.
            int cand = max({f1 - 2, min(f1 - 1, f2), f3});
            if (cand >= 1 && cand > best)
                best = cand;
        }
        return best;
    }
};
