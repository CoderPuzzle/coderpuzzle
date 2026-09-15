class Solution {
  public:
    // Cut right after the k-th word: each space closes one word, so the
    // k-th space (when it exists) sits exactly at the cut point.
    string truncateSentence(string s, int k) {
        int count = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            if (s[i] == ' ') {
                count++;
                if (count == k) {
                    return s.substr(0, i);
                }
            }
        }
        return s;
    }
};
