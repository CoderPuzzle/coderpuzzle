class Solution {

    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;
        long total = 0;
        for (int value : cardPoints) {
            total += value;
        }
        // taking k cards off the ends always leaves a contiguous middle block
        // of length n-k, so max score = total - min sum of a length n-k window
        int window = n - k;
        long current = 0;
        for (int i = 0; i < window; i++) {
            current += cardPoints[i];
        }
        long best = current;
        for (int i = window; i < n; i++) {
            // slide one position: add the entering card, drop the leaving one
            current += cardPoints[i] - cardPoints[i - window];
            if (current < best) {
                best = current;
            }
        }
        return (int) (total - best);
    }
}
