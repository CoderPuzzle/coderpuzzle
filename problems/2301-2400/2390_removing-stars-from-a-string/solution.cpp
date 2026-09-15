class Solution {
  public:
    string removeStars(string s) {
        // A star deletes the most recently kept character, so keep a
        // stack of survivors: push letters, pop on stars.
        string kept;
        kept.reserve(s.size());
        for (char c : s) {
            if (c == '*') {
                kept.pop_back();
            } else {
                kept.push_back(c);
            }
        }
        return kept;
    }
};
