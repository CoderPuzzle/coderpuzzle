import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean containsNearbyDuplicate(int[] nums, int k) {
        // Hash map from value -> last index seen: of all earlier copies of a
        // value, the most recent one is the nearest, so one lookup answers
        // "was this value within k positions?" in O(1).
        Map<Integer, Integer> lastIndex = new HashMap<>();
        for (int index = 0; index < nums.length; ++index) {
            // Look up before inserting, and compare against the LAST earlier
            // occurrence only: if it is out of range, every older one is too.
            Integer earlier = lastIndex.get(nums[index]);
            if (earlier != null && index - earlier <= k) return true;
            // Overwrite so the entry always holds the most recent position —
            // a first-occurrence map would miss later, closer pairs.
            lastIndex.put(nums[index], index);
        }
        return false;
    }
}
