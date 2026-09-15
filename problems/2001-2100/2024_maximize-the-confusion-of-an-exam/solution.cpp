class Solution {
  public:
    int maxConsecutiveAnswers(string answerKey, int k) {
        // t/f count answers inside the window; a window can be made uniform
        // by flipping whichever character is currently the minority.
        int t = 0, f = 0;
        int left = 0;
        int best = 0;
        int n = answerKey.size();
        for (int right = 0; right < n; right++) {
            if (answerKey[right] == 'T')
                t++;
            else
                f++;
            // Valid iff the minority count fits within the k flips — the min
            // covers both choices of final majority at once. Validity is
            // monotone in window size, so shrinking from the left alone
            // restores it.
            while (min(t, f) > k) {
                if (answerKey[left] == 'T')
                    t--;
                else
                    f--;
                left++;
            }
            best = max(best, right - left + 1);
        }
        return best;
    }
};
