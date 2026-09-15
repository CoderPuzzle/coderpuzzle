class Solution {
  public:
    int countQuadruples(string firstString, string secondString) {
        // Only single-character pairs can be optimal: a longer match
        // shrinks to its two leading characters (same a, smaller j), and
        // each letter does best pairing its first occurrence here with
        // its last occurrence there.
        int n1 = firstString.size();
        vector<int> first(26, -1), last(26, -1);
        for (int i = 0; i < n1; i++) {
            int c = firstString[i] - 'a';
            if (first[c] == -1) {
                first[c] = i;
            }
        }
        for (int a = 0; a < (int)secondString.size(); a++) {
            last[secondString[a] - 'a'] = a;
        }
        int best = 0, count = 0;
        bool any = false;
        for (int c = 0; c < 26; c++) {
            if (first[c] == -1 || last[c] == -1) {
                continue;
            }
            int diff = first[c] - last[c];
            if (!any || diff < best) {
                any = true;
                best = diff;
                count = 1;
            } else if (diff == best) {
                count++;
            }
        }
        return count;
    }
};
