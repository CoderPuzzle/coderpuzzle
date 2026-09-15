class Solution {
  public:
    string smallestString(string s) {
        // Decrementing a letter helps only when it is not 'a', so the win
        // starts at the first non-'a' letter: shrink that entire run of
        // non-'a' letters and stop at the next 'a' or the end (turning an
        // 'a' into 'z' would only hurt). An all-'a' string has no helpful
        // edit at all, so the mandatory operation wraps just the last
        // letter to 'z'.
        int n = s.size();
        int i = 0;
        while (i < n && s[i] == 'a') {
            i++;
        }
        if (i == n) {
            s[n - 1] = 'z';
            return s;
        }
        while (i < n && s[i] != 'a') {
            s[i]--;
            i++;
        }
        return s;
    }
};
