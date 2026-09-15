class Solution {
  public:
    // The shorter word list must be covered by a common prefix plus a
    // common suffix of the longer one; whatever sits between them is
    // the inserted sentence.
    bool areSentencesSimilar(string sentence1, string sentence2) {
        vector<string> w1 = splitWords(sentence1);
        vector<string> w2 = splitWords(sentence2);
        size_t i = 0;
        while (i < w1.size() && i < w2.size() && w1[i] == w2[i]) {
            i++;
        }
        size_t j = 0;
        while (j < w1.size() - i && j < w2.size() - i && w1[w1.size() - 1 - j] == w2[w2.size() - 1 - j]) {
            j++;
        }
        return i + j >= min(w1.size(), w2.size());
    }

  private:
    vector<string> splitWords(const string &sentence) {
        vector<string> words;
        size_t start = 0;
        for (size_t k = 0; k <= sentence.size(); k++) {
            if (k == sentence.size() || sentence[k] == ' ') {
                words.push_back(sentence.substr(start, k - start));
                start = k + 1;
            }
        }
        return words;
    }
};
