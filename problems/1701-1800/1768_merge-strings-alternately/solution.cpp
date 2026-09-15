class Solution {
  public:
    string mergeAlternately(string word1, string word2) {
        // One pointer per word: emit alternately while both words still
        // have characters, then append whichever tail remains.
        string out;
        out.reserve(word1.size() + word2.size());
        size_t i = 0;
        size_t j = 0;
        while (i < word1.size() && j < word2.size()) {
            out.push_back(word1[i]);
            out.push_back(word2[j]);
            i++;
            j++;
        }
        out.append(word1, i, string::npos);
        out.append(word2, j, string::npos);
        return out;
    }
};
