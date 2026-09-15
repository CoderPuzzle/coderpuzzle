class Solution {
  public:
    string longestPrefix(string s) {
        int n = s.size();
        // KMP prefix function: pi[i] = length of the longest proper prefix
        // of s[0..i] that is also its suffix; j is the current match length
        vector<int> pi(n, 0);
        int j = 0;
        for (int i = 1; i < n; i++) {
            // mismatch: fall back to the border of the matched block — the
            // next-longest candidate; j rises <= 1 per step, so the pass is O(n)
            while (j > 0 && s[i] != s[j]) {
                j = pi[j - 1];
            }
            if (s[i] == s[j]) {
                j++;
            }
            pi[i] = j;
        }
        // pi[n-1] is a proper border, so it never equals the whole string
        return n > 0 ? s.substr(0, pi[n - 1]) : "";
    }
};
