class Solution {
  public:
    int lengthOfLongestSubstringTwoDistinct(string s) {
        // Sliding window with a character count map. The map never holds more
        // than two entries, so the window is always a valid substring and the
        // answer is simply the largest width it ever reaches.
        unordered_map<char, int> counts;
        int best = 0;
        int left = 0;
        for (int right = 0; right < (int)s.size(); ++right) {
            ++counts[s[right]];
            // A third distinct character broke the rule: shrink from the left
            // until one character's count drains to zero and leaves the map.
            while (counts.size() > 2) {
                char leftmost = s[left];
                if (--counts[leftmost] == 0)
                    counts.erase(leftmost);
                ++left;
            }
            best = max(best, right - left + 1);
        }
        return best;
    }
};
