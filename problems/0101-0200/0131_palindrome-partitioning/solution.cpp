class Solution {
  public:
    vector<vector<string>> partition(string s) {
        int n = (int)s.size();
        // Table of palindrome verdicts for every interval s[i..j].
        vector<vector<bool>> isPal(n, vector<bool>(n, false));
        // Reverse i ensures the inner interval is computed before any outer
        // interval that reads it.
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                // Palindrome iff ends match and the interior is empty or pal.
                if (s[i] == s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                    isPal[i][j] = true;
                }
            }
        }

        vector<vector<string>> result;
        vector<string> current;
        backtrack(s, 0, isPal, current, result);
        return result;
    }

  private:
    void backtrack(const string &s, int start, const vector<vector<bool>> &isPal, vector<string> &current,
                   vector<vector<string>> &result) {
        if (start == (int)s.size()) {
            // The pieces tile the whole string: snapshot the partition.
            result.push_back(current);
            return;
        }
        // Increasing `end` yields shorter first pieces before longer ones,
        // producing the required output order.
        for (int end = start; end < (int)s.size(); end++) {
            if (isPal[start][end]) {
                current.push_back(s.substr(start, end - start + 1));
                backtrack(s, end + 1, isPal, current, result);
                current.pop_back();
            }
        }
    }
};
