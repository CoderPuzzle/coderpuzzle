class Solution {
  public:
    vector<string> letterCasePermutation(string s) {
        // Interleaved list-doubling: scan s left to right; at each letter
        // every string built so far is immediately followed by its copy
        // with that one letter's case flipped.
        vector<string> result{s};
        for (int i = 0; i < (int)s.size(); ++i) {
            char ch = s[i];
            bool letter = (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
            if (!letter) {
                continue;
            }
            vector<string> grown;
            grown.reserve(result.size() * 2);
            for (const auto &current : result) {
                grown.push_back(current);
                string toggled = current;
                toggled[i] ^= 0x20;
                grown.push_back(move(toggled));
            }
            result = move(grown);
        }
        return result;
    }
};
