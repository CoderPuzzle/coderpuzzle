class Solution {
  public:
    string reorderSpaces(string text) {
        vector<string> words;
        string word;
        int spaces = 0;
        for (char c : text) {
            if (c == ' ') {
                spaces++;
                if (!word.empty()) {
                    words.push_back(word);
                    word.clear();
                }
            } else {
                word += c;
            }
        }
        if (!word.empty())
            words.push_back(word);

        if (words.size() == 1) {
            // A single word: every space is trailing.
            return words[0] + string(spaces, ' ');
        }

        // Distribute spaces as evenly as possible between the gaps, and
        // push whatever does not divide evenly to the end.
        int gaps = static_cast<int>(words.size()) - 1;
        int between = spaces / gaps;
        int extra = spaces % gaps;

        string result;
        for (size_t i = 0; i < words.size(); i++) {
            if (i > 0)
                result += string(between, ' ');
            result += words[i];
        }
        result += string(extra, ' ');
        return result;
    }
};
