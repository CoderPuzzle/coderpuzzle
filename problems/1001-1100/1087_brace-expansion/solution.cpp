class Solution {
  public:
    vector<string> expand(string s) {
        // Parse into option groups: a bare letter is a one-element group,
        // and "{a,b,c}" becomes ["a","b","c"]. Backtrack over the choices,
        // then sort the finished words.
        vector<vector<string>> tokens;
        int i = 0;
        while (i < (int)s.size()) {
            if (s[i] == '{') {
                int j = i;
                while (s[j] != '}')
                    ++j;
                vector<string> group;
                string piece;
                for (int k = i + 1; k < j; ++k) {
                    if (s[k] == ',') {
                        group.push_back(piece);
                        piece.clear();
                    } else {
                        piece.push_back(s[k]);
                    }
                }
                group.push_back(piece);
                tokens.push_back(group);
                i = j + 1;
            } else {
                tokens.push_back({string(1, s[i])});
                ++i;
            }
        }
        vector<string> result;
        string cur;
        function<void(int)> dfs = [&](int idx) {
            if (idx == (int)tokens.size()) {
                result.push_back(cur);
                return;
            }
            for (const string &opt : tokens[idx]) {
                cur += opt;
                dfs(idx + 1);
                cur.resize(cur.size() - opt.size());
            }
        };
        dfs(0);
        sort(result.begin(), result.end());
        return result;
    }
};
