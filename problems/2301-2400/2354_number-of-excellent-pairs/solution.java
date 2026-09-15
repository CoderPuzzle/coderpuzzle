import java.util.HashSet;
import java.util.Set;

class Solution {

    public long countExcellentPairs(int[] nums, int k) {
        // identity: popcount(a|b) + popcount(a&b) = popcount(a) + popcount(b),
        // so the pair condition depends only on the two individual bit counts
        // dedupe first: pairs are counted over distinct values
        Set<Integer> unique = new HashSet<>();
        for (int x : nums) unique.add(x);
        // bucket distinct values by their set-bit count
        long[] counts = new long[64];
        for (int x : unique) counts[Integer.bitCount(x)]++;
        long answer = 0;
        // ordered bucket pairs: c1*c2 covers (a,b) and (b,a), plus (a,a) once
        for (int b1 = 0; b1 < 64; b1++) {
            if (counts[b1] == 0) continue;
            for (int b2 = 0; b2 < 64; b2++) {
                if (b1 + b2 >= k) answer += counts[b1] * counts[b2];
            }
        }
        return answer;
    }
}
