class Solution {
  public:
    string largestMerge(string word1, string word2) {
        // Take the next character from whichever REMAINING string is
        // lexicographically larger — the suffix comparison settles not
        // just differing heads but the tie case.
        string out;
        out.reserve(word1.size() + word2.size());
        int i = 0, j = 0;
        int n = (int)word1.size(), m = (int)word2.size();
        while (i < n && j < m) {
            if (word1.compare(i, n - i, word2, j, m - j) > 0) {
                out.push_back(word1[i]);
                i++;
            } else {
                out.push_back(word2[j]);
                j++;
            }
        }
        out.append(word1, i, n - i);
        out.append(word2, j, m - j);
        return out;
    }
};
