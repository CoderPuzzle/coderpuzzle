class Solution {
  public:
    vector<int> validSequence(string word1, string word2) {
        // last[j] anchors where word2[j:] is still exactly embeddable: one
        // right-to-left sweep matches the tail of word2 against word1 and
        // records, per slot, the index that consumed its character. The
        // forward walk then takes every exact match immediately and spends
        // the single allowed change only when the guard proves the rest of
        // word2 still fits exactly after it (last slot, or i before
        // last[j + 1]); a change already spent forbids further mismatches.
        int m = word2.size();
        vector<int> ans(m);
        vector<int> last(m, -1);
        int i = word1.size() - 1;
        int j = m - 1;
        while (i >= 0 && j >= 0) {
            if (word1[i] == word2[j]) {
                last[j--] = i;
            }
            --i;
        }
        bool can_change = true;
        j = 0;
        for (i = 0; i < (int)word1.size(); ++i) {
            if (j == m) {
                break;
            }
            if (word1[i] == word2[j]) {
                ans[j++] = i;
            } else if (can_change && (j == m - 1 || i < last[j + 1])) {
                can_change = false;
                ans[j++] = i;
            }
        }
        return j == m ? ans : vector<int>();
    }
};
