class Solution {
  public:
    string generateString(string str1, string str2) {
        // 'T' windows pin their characters outright: stamp str2 into each
        // one, refusing the instance when two stamps disagree.
        int n = str1.size(), m = str2.size();
        int total = n + m - 1;
        string word(total, '\0');
        vector<char> covered(total, 0);
        for (int i = 0; i < n; ++i) {
            if (str1[i] == 'T') {
                for (int j = 0; j < m; ++j) {
                    int p = i + j;
                    if (word[p] != '\0' && word[p] != str2[j])
                        return "";
                    word[p] = str2[j];
                    covered[p] = 1;
                }
            }
        }
        // Every other position takes 'a', the smallest character available.
        for (int p = 0; p < total; ++p) {
            if (word[p] == '\0')
                word[p] = 'a';
        }
        // Repair 'F' windows left to right: one that accidentally equals
        // str2 must differ somewhere, and bumping its rightmost free slot
        // from 'a' to 'b' is the smallest change that late in the string.
        for (int i = 0; i < n; ++i) {
            if (str1[i] == 'F' && word.compare(i, m, str2) == 0) {
                int j = i + m - 1;
                while (j >= i && covered[j])
                    --j;
                if (j < i)
                    return ""; // fully pinned window that still matches
                word[j] = 'b';
            }
        }
        return word;
    }
};
