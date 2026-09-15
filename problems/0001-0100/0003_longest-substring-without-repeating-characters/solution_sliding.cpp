class Solution {
  public:
    int lengthOfLongestSubstring(string s) {
        // inWindow[c] marks the characters currently inside the window
        // s[start..i], which never contains a duplicate.
        vector<char> inWindow(256, 0);
        int start = 0, best = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            unsigned char c = s[i];
            // Evict characters from the left until c can enter without
            // duplicating: the window shrinks one step at a time.
            while (inWindow[c]) {
                inWindow[(unsigned char)s[start]] = 0;
                start++;
            }
            inWindow[c] = 1;
            // The window is duplicate-free again: record its length.
            best = max(best, i - start + 1);
        }
        return best;
    }
};
