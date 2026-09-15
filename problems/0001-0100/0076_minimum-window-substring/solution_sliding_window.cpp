class Solution {
  public:
    string minWindow(string s, string t) {
        if (t.empty() || t.size() > s.size())
            return "";
        // need[c] = copies of c the window still owes; missing = total owed
        // instances, so missing == 0 is an O(1) coverage test.
        unordered_map<char, int> need;
        for (char ch : t) {
            need[ch]++;
        }
        int missing = t.size();
        int bestStart = 0, bestLen = INT_MAX;
        size_t left = 0;
        for (size_t right = 0; right < s.size(); right++) {
            char ch = s[right];
            // need > 0 means this occurrence is genuinely required; the
            // unconditional decrement then drives surplus copies negative
            // without ever touching missing again.
            if (need.count(ch) && need[ch] > 0)
                missing--;
            need[ch]--;
            if (missing == 0) {
                // Valid window: shed surplus leftmost characters, returning
                // each released copy to the budget, until one sits at quota.
                while (left < right && need[s[left]] < 0) {
                    need[s[left]]++;
                    left++;
                }
                if ((int)(right - left + 1) < bestLen) {
                    bestStart = left;
                    bestLen = right - left + 1;
                }
                // Evict the leftmost required character on purpose so the
                // search owes exactly one instance and scanning can resume.
                need[s[left]]++;
                missing++;
                left++;
            }
        }
        return bestLen == INT_MAX ? "" : s.substr(bestStart, bestLen);
    }
};
