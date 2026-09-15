import java.util.*;

class Solution {

    public int minOperations(int[] nums) {
        // The answer is at most nums.length / 2, safely inside int.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int num : nums) {
            counts.merge(num, 1, Integer::sum);
        }
        int operations = 0;
        for (int count : counts.values()) {
            if (count == 1) {
                return -1;
            }
            operations += (count + 2) / 3;
        }
        return operations;
    }
}
