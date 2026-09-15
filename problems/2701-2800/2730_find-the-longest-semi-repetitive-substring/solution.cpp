class Solution {
  public:
    int longestSemiRepetitiveSubstring(string s) {
        int best = 0;
        int left = 0;
        int pairs = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            if (right > 0 && s[right] == s[right - 1]) {
                pairs++;
            }
            while (pairs > 1) {
                if (s[left] == s[left + 1]) {
                    pairs--;
                }
                left++;
            }
            best = max(best, right - left + 1);
        }
        return best;
    }
};
