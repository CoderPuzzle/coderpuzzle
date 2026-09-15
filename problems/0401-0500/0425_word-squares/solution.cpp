class Solution {
  public:
    vector<vector<string>> wordSquares(vector<string> &words) {
        int n = (int)words[0].size();
        // Map every prefix of every word (empty prefix included) to the words
        // sharing it, so each search step is a single lookup.
        map<string, vector<string>> prefixMap;
        for (const string &w : words) {
            for (int i = 0; i <= n; i++) {
                prefixMap[w.substr(0, i)].push_back(w);
            }
        }

        vector<vector<string>> results;
        vector<string> square;
        backtrack(prefixMap, square, n, results);

        // Sorting only makes the output order deterministic.
        sort(results.begin(), results.end(), [](const vector<string> &a, const vector<string> &b) {
            for (size_t i = 0; i < a.size(); i++) {
                if (a[i] != b[i])
                    return a[i] < b[i];
            }
            return false;
        });
        return results;
    }

  private:
    void backtrack(map<string, vector<string>> &prefixMap, vector<string> &square, int n,
                   vector<vector<string>> &results) {
        if ((int)square.size() == n) {
            results.push_back(square);
            return;
        }
        int col = (int)square.size();
        // Row `col` must start with the column-`col` chars already placed,
        // so the next word is constrained to one forced prefix.
        string prefix;
        for (int r = 0; r < col; r++) {
            prefix += square[r][col];
        }
        // A matching word fixes square[j][col] == square[col][j] for every
        // earlier row j at once; a missing bucket prunes the branch here.
        auto it = prefixMap.find(prefix);
        if (it == prefixMap.end())
            return;
        for (const string &w : it->second) {
            square.push_back(w);
            backtrack(prefixMap, square, n, results);
            square.pop_back();
        }
    }
};
