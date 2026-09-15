class Solution {
  public:
    string replaceWords(vector<string> &dictionary, string sentence) {
        // One set holds every root, so a prefix test is a single hash
        // lookup. No root is longer than 100 letters, so a word longer
        // than that can stop its scan early — prefixes past the cap could
        // not equal any root anyway.
        unordered_set<string> roots(dictionary.begin(), dictionary.end());
        // Each derivative is replaced by its shortest matching root, and
        // the scan tries prefixes shortest first, so the first hit is the
        // answer; a word no root prefixes keeps itself.
        string result;
        string word;
        istringstream stream(sentence);
        bool first = true;
        while (stream >> word) {
            int limit = min<int>(word.size(), 100);
            for (int length = 1; length <= limit; length++) {
                if (roots.count(word.substr(0, length))) {
                    word.resize(length);
                    break;
                }
            }
            if (!first) {
                result += ' ';
            }
            first = false;
            result += word;
        }
        return result;
    }
};
