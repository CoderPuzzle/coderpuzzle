class Solution {
  public:
    // A one-character window must span a whole maximal run: starting
    // inside the run leaves the same character before it, ending inside
    // leaves the same character after it. So the answer is "some maximal
    // run has length exactly k".
    bool hasSpecialSubstring(string s, int k) {
        int n = s.size();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s[j] == s[i]) {
                j++;
            }
            if (j - i == k) {
                return true;
            }
            i = j;
        }
        return false;
    }
};
