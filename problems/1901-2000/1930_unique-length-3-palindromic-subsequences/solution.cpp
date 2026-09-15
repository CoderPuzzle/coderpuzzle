class Solution {
  public:
    int countPalindromicSubsequence(string s) {
        int count = 0;
        for (char ch = 'a'; ch <= 'z'; ch++) {
            // Palindrome ch-y-ch exists iff some y sits strictly between the
            // first and last occurrence of ch: anchoring the outers at the
            // outermost occurrences is the most permissive choice.
            int first = s.find(ch);
            int last = s.rfind(ch);
            if (first != -1 && last - first >= 2) {
                // Distinct chars only (a bitmap, not positions) so each
                // palindrome is counted once despite repeated middle letters.
                vector<bool> seen(26, false);
                for (int i = first + 1; i < last; i++)
                    seen[s[i] - 'a'] = true;
                count += count_if(seen.begin(), seen.end(), [](bool b) { return b; });
            }
        }
        return count;
    }
};
