class Solution {
  public:
    int numSpecialEquivGroups(vector<string> &words) {
        // Swaps never mix parities: even-indexed letters only trade with
        // even-indexed ones, odd with odd, so a word is exactly its two
        // sorted halves. The set counts distinct (even, odd) signatures.
        unordered_set<string> seen;
        for (const auto &word : words) {
            string even, odd;
            for (int i = 0; i < (int)word.size(); ++i) {
                if (i % 2 == 0) {
                    even += word[i];
                } else {
                    odd += word[i];
                }
            }
            sort(even.begin(), even.end());
            sort(odd.begin(), odd.end());
            seen.insert(even + "#" + odd);
        }
        return (int)seen.size();
    }
};
