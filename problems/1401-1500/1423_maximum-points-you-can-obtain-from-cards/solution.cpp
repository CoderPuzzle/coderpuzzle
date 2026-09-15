class Solution {
  public:
    int maxScore(vector<int> &cardPoints, int k) {
        int n = cardPoints.size();
        long long total = 0;
        for (int value : cardPoints) {
            total += value;
        }
        // taking k cards off the ends always leaves a contiguous middle block
        // of length n-k, so max score = total - min sum of a length n-k window
        int window = n - k;
        long long current = 0;
        for (int i = 0; i < window; i++) {
            current += cardPoints[i];
        }
        long long best = current;
        for (int i = window; i < n; i++) {
            // slide one position: add the entering card, drop the leaving one
            current += cardPoints[i] - cardPoints[i - window];
            if (current < best) {
                best = current;
            }
        }
        return static_cast<int>(total - best);
    }
};
