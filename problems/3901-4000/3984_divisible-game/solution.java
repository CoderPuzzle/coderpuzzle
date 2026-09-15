import java.util.HashSet;
import java.util.Set;

class Solution {

    public int divisibleGame(int[] nums) {
        long modulus = 1_000_000_007L;
        Set<Integer> candidates = new HashSet<>();
        candidates.add(2);
        for (int value : nums) {
            for (int divisor = 2; divisor * divisor <= value; divisor++) {
                if (value % divisor == 0) {
                    candidates.add(divisor);
                    candidates.add(value / divisor);
                }
            }
            if (value > 1) candidates.add(value);
        }

        long bestScore = Long.MIN_VALUE;
        int bestK = 0;
        for (int k : candidates) {
            long score = Long.MIN_VALUE;
            long current = 0;
            for (int value : nums) {
                long transformed = value % k == 0 ? value : -value;
                current = Math.max(transformed, current + transformed);
                score = Math.max(score, current);
            }
            if (score > bestScore || (score == bestScore && k < bestK)) {
                bestScore = score;
                bestK = k;
            }
        }
        long answer = ((((bestScore % modulus) + modulus) % modulus) * bestK) % modulus;
        return (int) answer;
    }
}
