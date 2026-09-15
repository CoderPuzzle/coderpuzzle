import java.util.HashMap;
import java.util.Map;

class Solution {

    public int findMaxLength(int[] nums) {
        // Treat 0 as -1 and 1 as +1 and carry the running balance: equal
        // counts cancel, so a repeated balance at i < j bounds an
        // equal-count subarray of length j - i. Keep only the FIRST index
        // of each balance (0 seeded at -1) so every repeat stretches its
        // window as far as possible.
        Map<Integer, Integer> first = new HashMap<>();
        first.put(0, -1);
        int best = 0;
        int balance = 0;
        for (int index = 0; index < nums.length; ++index) {
            balance += nums[index] == 1 ? 1 : -1;
            Integer earlier = first.get(balance);
            if (earlier != null) {
                best = Math.max(best, index - earlier);
            } else {
                first.put(balance, index);
            }
        }
        return best;
    }
}
