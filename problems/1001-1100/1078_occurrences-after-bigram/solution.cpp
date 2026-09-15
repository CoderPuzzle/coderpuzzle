class Solution {
  public:
    vector<string> findOcurrences(string text, string first, string second) {
        vector<string> words;
        stringstream ss(text);
        string word;
        while (ss >> word) {
            words.push_back(word);
        }
        vector<string> thirds;
        // Bounding at words.size() - 2 guarantees words[i + 2] always
        // exists, so a bigram landing on the last two words is never
        // inspected.
        for (int i = 0; i + 2 < (int)words.size(); ++i) {
            if (words[i] == first && words[i + 1] == second) {
                thirds.push_back(words[i + 2]);
            }
        }
        return thirds;
    }
};
