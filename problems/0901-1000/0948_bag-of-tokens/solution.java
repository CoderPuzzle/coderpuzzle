import java.util.Arrays;

class Solution {

    public int bagOfTokensScore(int[] tokens, int power) {
        // An optimal plan buys points with the cheapest tokens and sells the
        // dearest ones for power, so sort and walk two pointers inward.
        Arrays.sort(tokens);
        int left = 0,
            right = tokens.length - 1;
        int score = 0,
            best = 0;
        while (left <= right) {
            if (power >= tokens[left]) {
                // Affordable: buy a point with the cheapest remaining token.
                power -= tokens[left];
                score++;
                left++;
                best = Math.max(best, score);
            } else if (score >= 1 && left < right) {
                // Broke: sell a point for the power of the dearest token,
                // keeping one token in play to spend it on.
                power += tokens[right];
                score--;
                right--;
            } else {
                break;
            }
        }
        return best;
    }
}
