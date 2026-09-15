class Solution {
  public:
    vector<string> commonChars(vector<string> &words) {
        // Fold every word's 26-length letter-count array into a running
        // element-wise minimum; a letter absent from any single word is
        // pinned to zero from that point on.
        array<int, 26> common{};
        for (size_t i = 0; i < words.size(); ++i) {
            array<int, 26> counts{};
            for (char c : words[i]) {
                ++counts[c - 'a'];
            }
            if (i == 0) {
                common = counts;
            } else {
                for (int j = 0; j < 26; ++j) {
                    common[j] = min(common[j], counts[j]);
                }
            }
        }
        // Reading the surviving counts off from 'a' to 'z' builds the
        // answer directly in ascending alphabetical order.
        vector<string> result;
        for (int i = 0; i < 26; ++i) {
            for (int k = 0; k < common[i]; ++k) {
                result.push_back(string(1, static_cast<char>('a' + i)));
            }
        }
        return result;
    }
};
