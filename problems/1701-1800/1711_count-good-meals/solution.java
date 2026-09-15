import java.util.HashMap;
import java.util.Map;

class Solution {

    // A good meal needs two values summing to a power of two. Values are
    // capped at 2^20, so a sum never exceeds 2^21: exactly the 22 powers
    // 2^0 .. 2^21 are possible targets and nothing else. Counting how
    // often each value occurs settles every pair at once. For a distinct
    // value v and a power p, the mate w = p - v contributes
    // count(v) * count(w) pairs when w > v, while w == v (p equal to 2v
    // exactly) contributes count(v) choose 2: the pairs of equal-valued
    // items at different indices. The raw total reaches n * (n - 1) / 2,
    // past 32 bits, so it accumulates in a long and reduces mod 10^9 + 7
    // at the end.
    public int countPairs(int[] deliciousness) {
        final int MOD = 1_000_000_007;
        Map<Integer, Integer> count = new HashMap<>();
        for (int value : deliciousness) {
            count.merge(value, 1, Integer::sum);
        }
        long total = 0;
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            int value = entry.getKey();
            int c = entry.getValue();
            for (int power = 1; power <= 1 << 21; power <<= 1) {
                int mate = power - value;
                if (mate > value) {
                    total += (long) c * count.getOrDefault(mate, 0);
                } else if (mate == value) {
                    total += ((long) c * (c - 1)) / 2;
                }
            }
        }
        return (int) (total % MOD);
    }
}
