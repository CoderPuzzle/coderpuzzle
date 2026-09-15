import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

class Solution {

    // One pass buckets the indices of every value; pick(target) draws one of
    // that value's index buckets uniformly, so each qualifying index is
    // exactly equally likely.
    private final Map<Integer, List<Integer>> positions = new HashMap<>();

    public Solution(int[] nums) {
        for (int index = 0; index < nums.length; index++) {
            positions.computeIfAbsent(nums[index], value -> new ArrayList<>()).add(index);
        }
    }

    public int pick(int target) {
        List<Integer> indices = positions.get(target);
        return indices.get(ThreadLocalRandom.current().nextInt(indices.size()));
    }
}
