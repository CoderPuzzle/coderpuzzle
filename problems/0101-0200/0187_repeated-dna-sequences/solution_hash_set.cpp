class Solution {
  public:
    vector<string> findRepeatedDnaSequences(string s) {
        unordered_set<string> seen;
        // A second set collects each repeated window exactly once, even when
        // it occurs three or more times.
        unordered_set<string> repeated;
        // Slide a fixed 10-letter window; strings shorter than 10 produce no
        // full window and yield an empty result.
        if (s.size() >= 10) {
            for (size_t i = 0; i + 10 <= s.size(); i++) {
                string seq = s.substr(i, 10);
                // insert() reports false when the window was already seen,
                // i.e. it occurs at least twice.
                if (!seen.insert(seq).second) {
                    repeated.insert(std::move(seq));
                }
            }
        }
        // Sorted output for a deterministic order.
        vector<string> result(repeated.begin(), repeated.end());
        sort(result.begin(), result.end());
        return result;
    }
};
