import java.util.*;

class Solution {

    public int minimumOperations(int[] nums) {
        Set<Integer> values = new HashSet<>();
        for (int num : nums) {
            if (num > 0) {
                values.add(num);
            }
        }
        return values.size();
    }
}
