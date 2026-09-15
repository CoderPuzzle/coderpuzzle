class Solution {
  public:
    long long calculateScore(string s) {
        // One stack of unmarked indices per letter: the closest unmarked
        // mirror candidate is always the most recently pushed one.
        array<vector<int>, 26> stacks;
        long long score = 0;
        for (int i = 0; i < (int)s.size(); ++i) {
            int c = s[i] - 'a';
            vector<int> &mirror = stacks[25 - c];
            if (!mirror.empty()) {
                // Match with the nearest unmarked mirror and mark both.
                score += i - mirror.back();
                mirror.pop_back();
            } else {
                stacks[c].push_back(i);
            }
        }
        return score;
    }
};
