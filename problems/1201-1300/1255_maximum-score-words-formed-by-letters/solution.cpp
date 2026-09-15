class Solution {
  public:
    int maxScoreWords(vector<string> &words, vector<string> &letters, vector<int> &score) {
        // 26-entry count of the letter pool
        array<int, 26> available{};
        for (auto &s : letters)
            available[s[0] - 'a']++;
        // precompute each word's letter-requirement vector and total score so
        // the recursion works on counts only (n <= 14 makes 2^n fine)
        int n = words.size();
        vector<array<int, 26>> needs(n);
        vector<int> values(n);
        for (int i = 0; i < n; i++) {
            for (char ch : words[i]) {
                int j = ch - 'a';
                needs[i][j]++;
                values[i] += score[j];
            }
        }
        int best = 0;
        function<void(int, array<int, 26> &, int)> dfs = [&](int i, array<int, 26> &remaining, int total) {
            // every node is already a complete valid selection (the rest can
            // be skipped), so compare best here rather than only at leaves
            best = max(best, total);
            if (i == n)
                return;
            // branch 1: always explore skipping word i
            dfs(i + 1, remaining, total);
            // branch 2: take word i only when the pool covers it; an
            // infeasible word simply prunes that subtree
            auto &need = needs[i];
            bool ok = true;
            for (int j = 0; j < 26; j++) {
                if (remaining[j] < need[j]) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                array<int, 26> next = remaining;
                for (int j = 0; j < 26; j++)
                    next[j] -= need[j];
                dfs(i + 1, next, total + values[i]);
            }
        };
        dfs(0, available, 0);
        return best;
    }
};
