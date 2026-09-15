class Solution {
  public:
    int maxRepeating(string sequence, string word) {
        // word is k-repeating exactly when some window of sequence is
        // tiled by k back-to-back copies of word — no overlap, no gap.
        // Scan start positions right to left: run[i] is the number of
        // copies in the longest tiling beginning at i, so a match at i
        // gives run[i] = run[i + m] + 1; the answer is the maximum run.
        // A self-overlapping word such as "aa" cannot chain through the
        // overlap, and scattered matches never tile into one block.
        int n = (int)sequence.size(), m = (int)word.size();
        vector<int> run(n + 1, 0);
        int best = 0;
        for (int i = n - 1; i >= 0; --i) {
            if (i + m <= n && sequence.compare(i, m, word) == 0) {
                run[i] = run[i + m] + 1;
                best = max(best, run[i]);
            }
        }
        return best;
    }
};
