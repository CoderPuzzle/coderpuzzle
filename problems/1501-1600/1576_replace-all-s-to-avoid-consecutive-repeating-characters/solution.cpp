class Solution {
  public:
    string modifyString(string s) {
        // Only 3 candidate letters and at most 2 neighbors to avoid, so one
        // of 'a', 'b', 'c' (tried in that fixed order) always works.
        int n = (int)s.size();
        for (int i = 0; i < n; ++i) {
            if (s[i] != '?') {
                continue;
            }
            for (char candidate = 'a'; candidate <= 'c'; ++candidate) {
                bool leftOk = i == 0 || s[i - 1] != candidate;
                bool rightOk = i == n - 1 || s[i + 1] != candidate;
                if (leftOk && rightOk) {
                    s[i] = candidate;
                    break;
                }
            }
        }
        return s;
    }
};
