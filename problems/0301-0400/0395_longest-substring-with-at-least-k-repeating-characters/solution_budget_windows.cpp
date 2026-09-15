class Solution {
  public:
    int longestSubstring(string s, int k) {
        int best = 0;
        for (int budget = 1; budget <= 26; budget++) {
            best = max(best, sweep(s, k, budget));
        }
        return best;
    }

  private:
    int sweep(const string &s, int k, int budget) {
        int counts[128] = {0};
        int distinct = 0;
        int qualified = 0;
        int best = 0;
        int left = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            unsigned char ch = s[right];
            if (counts[ch] == 0)
                distinct++;
            counts[ch]++;
            if (counts[ch] == k)
                qualified++;
            // Growing a window never lowers its letter variety, so once the
            // window busts the budget only shrinking repairs it: left advances
            // monotonically and never backtracks.
            while (distinct > budget) {
                unsigned char drop = s[left];
                left++;
                if (counts[drop] == k)
                    qualified--;
                counts[drop]--;
                if (counts[drop] == 0)
                    distinct--;
            }
            // qualified never exceeds distinct, which never exceeds the budget,
            // so reaching the budget means exactly budget letters are present
            // and each has reached k. A letter rarer than k across the whole
            // string never joins qualified, so windows relying on it stay
            // unrecorded.
            if (qualified == budget)
                best = max(best, right - left + 1);
        }
        return best;
    }
};
