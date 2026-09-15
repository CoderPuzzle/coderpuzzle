import java.util.HashMap;
import java.util.Map;

class Solution {

    // nums[p] * nums[r] == nums[q] * nums[s] rearranges to
    // nums[p] / nums[q] == nums[s] / nums[r]: a leading pair (p, q) and a
    // trailing pair (r, s) sharing one reduced fraction. Sweep r left to
    // right; when r clears q + 2 the pair (p, q) joins the counter, and
    // every (r, s) with s >= r + 2 looks its fraction up.
    public long numberOfSubsequences(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        long total = 0;
        for (int r = 0; r < nums.length; ++r) {
            if (r >= 2) {
                int q = r - 2;
                for (int p = 0; p <= q - 2; ++p) {
                    int divisor = gcd(nums[p], nums[q]);
                    int key = (nums[p] / divisor) * 1001 + nums[q] / divisor;
                    counts.merge(key, 1, Integer::sum);
                }
            }
            for (int s = r + 2; s < nums.length; ++s) {
                int divisor = gcd(nums[s], nums[r]);
                int key = (nums[s] / divisor) * 1001 + nums[r] / divisor;
                total += counts.getOrDefault(key, 0);
            }
        }
        return total;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }
}
