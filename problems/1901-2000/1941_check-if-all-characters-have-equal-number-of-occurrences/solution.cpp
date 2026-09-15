class Solution {
  public:
    bool areOccurrencesEqual(string s) {
        // Every present character must share one frequency, so the set of
        // the per-character counts has size one.
        int counts[26] = {0};
        for (char ch : s) {
            counts[ch - 'a']++;
        }
        unordered_set<int> seen;
        for (int c : counts) {
            if (c > 0) {
                seen.insert(c);
            }
        }
        return seen.size() == 1;
    }
};
