import java.util.HashMap;
import java.util.Map;

class Solution {

    public int findValidSplit(int[] nums) {
        // Coprimality of the two products is decided by shared prime
        // factors, never by the products themselves: with n up to 10^4
        // and values up to 10^6, both sides reach thousands of digits.
        // Boundary i works exactly when no prime's occurrence span
        // [first, last] straddles it. A smallest-prime-factor sieve
        // factorizes each element in O(log value); a difference array
        // blocks the straddled boundaries; the first open boundary in
        // [0, n - 2] wins.
        int top = 0;
        for (int value : nums) top = Math.max(top, value);
        int[] spf = new int[top + 1];
        for (int i = 0; i <= top; ++i) spf[i] = i;
        for (int d = 2; (long) d * d <= top; ++d) {
            if (spf[d] == d) {
                for (int multiple = d * d; multiple <= top; multiple += d) {
                    if (spf[multiple] == multiple) spf[multiple] = d;
                }
            }
        }
        Map<Integer, Integer> first = new HashMap<>();
        Map<Integer, Integer> last = new HashMap<>();
        for (int index = 0; index < nums.length; ++index) {
            int value = nums[index];
            while (value > 1) {
                int prime = spf[value];
                first.putIfAbsent(prime, index);
                last.put(prime, index);
                while (value % prime == 0) value /= prime;
            }
        }
        int n = nums.length;
        int[] blocked = new int[n + 1];
        for (Map.Entry<Integer, Integer> entry : first.entrySet()) {
            int lo = entry.getValue();
            int hi = Math.min(last.get(entry.getKey()) - 1, n - 2);
            if (lo <= hi) {
                blocked[lo]++;
                blocked[hi + 1]--;
            }
        }
        int running = 0;
        for (int i = 0; i < n - 1; ++i) {
            running += blocked[i];
            if (running == 0) return i;
        }
        return -1;
    }
}
