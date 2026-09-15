#include <string>
#include <vector>

class Solution {
  public:
    string findTheString(vector<vector<int>> &lcp) {
        int n = lcp.size();
        // A real matrix is symmetric; reject fakes up front so only the
        // lower triangle needs checking later.
        for (int i = 0; i < n; ++i)
            for (int j = i + 1; j < n; ++j)
                if (lcp[i][j] != lcp[j][i])
                    return "";
        // Positive entries weld indices into letter-equality classes:
        // word[i] == word[j] iff lcp[i][j] > 0. Flood-fill those classes.
        vector<int> group(n, -1);
        int groups = 0;
        vector<int> stack;
        for (int i = 0; i < n; ++i) {
            if (group[i] >= 0)
                continue;
            group[i] = groups;
            stack.push_back(i);
            while (!stack.empty()) {
                int u = stack.back();
                stack.pop_back();
                for (int v = 0; v < n; ++v) {
                    if (lcp[u][v] > 0 && group[v] < 0) {
                        group[v] = groups;
                        stack.push_back(v);
                    }
                }
            }
            ++groups;
        }
        if (groups > 26)
            return "";
        // Cross-class order is unconstrained, so the alphabetically
        // smallest candidate numbers the classes by first appearance.
        string word(n, ' ');
        vector<char> letter(groups, '-');
        char nxt = 'a';
        for (int i = 0; i < n; ++i) {
            if (letter[group[i]] == '-')
                letter[group[i]] = nxt++;
            word[i] = letter[group[i]];
        }
        // Rebuild dp[i][j] = lcp(word[i:], word[j:]) bottom-up and require
        // an exact match on every stored entry; a fabricated matrix fails
        // here even when its positivity structure looked consistent.
        vector<int> below(n + 1, 0); // row i+1; trailing slot stays 0
        vector<int> code(n);
        vector<vector<int>> &m = lcp;
        for (int i = 0; i < n; ++i)
            code[i] = word[i];
        for (int i = n - 1; i >= 0; --i) {
            int ci = code[i];
            vector<int> cur(n + 1, 0);
            const vector<int> &target = m[i];
            for (int j = i; j >= 0; --j) {
                if (code[j] == ci)
                    cur[j] = below[j + 1] + 1;
                if (cur[j] != target[j])
                    return "";
            }
            below.swap(cur);
        }
        return word;
    }
};
