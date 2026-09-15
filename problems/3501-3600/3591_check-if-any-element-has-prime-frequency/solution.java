import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean checkPrimeFrequency(int[] nums) {
        // One pass counts each distinct value's frequency in a hash map,
        // then every frequency is tested for primality by trial division:
        // a factor with divisor * divisor <= frequency refutes it, 0 and 1
        // fail outright, and any frequency surviving the scan is prime.
        // Frequencies never exceed nums.length <= 100, so the checks are a
        // handful of divisions each.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) counts.merge(value, 1, Integer::sum);
        for (int frequency : counts.values()) {
            if (frequency < 2) continue;
            boolean isPrime = true;
            for (int divisor = 2; divisor * divisor <= frequency; divisor++) {
                if (frequency % divisor == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) return true;
        }
        return false;
    }
}
