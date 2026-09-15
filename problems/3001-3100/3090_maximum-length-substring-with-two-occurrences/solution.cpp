class Solution {
  public:
    int maximumLengthSubstring(string s) {
        // Slide a window over s while tracking one count per letter: grow on
        // the right each step, then shrink from the left only while the
        // freshly added letter would exceed its budget of two occurrences.
        vector<int> counts(26, 0);
        int best = 0;
        int left = 0;
        for (int right = 0; right < (int)s.size(); ++right) {
            int index = s[right] - 'a';
            ++counts[index];
            // Only the just-extended letter can be over budget, so the
            // window never has to shrink past its first offender.
            while (counts[index] > 2) {
                --counts[s[left] - 'a'];
                ++left;
            }
            best = max(best, right - left + 1);
        }
        return best;
    }
};
