class Solution {
  public:
    int maxPalindromesAfterOperations(vector<string> &words) {
        int count[26] = {};
        for (const string &word : words) {
            for (const char letter : word) {
                ++count[letter - 'a'];
            }
        }
        int pairs = 0;
        for (int letter = 0; letter < 26; ++letter) {
            pairs += count[letter] / 2;
        }
        vector<int> halves;
        halves.reserve(words.size());
        for (const string &word : words) {
            halves.push_back(word.size() / 2);
        }
        sort(halves.begin(), halves.end());
        int made = 0;
        for (const int half : halves) {
            if (half > pairs) {
                break;
            }
            pairs -= half;
            ++made;
        }
        return made;
    }
};
