import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean containsNearbyAlmostDuplicate(long[] nums, long indexDiff, long valueDiff) {
        // Value buckets of width valueDiff + 1, keyed by floor division: two
        // values in one bucket are within valueDiff by construction, so each
        // bucket holds at most one live value and a same-bucket hit is a "yes".
        Map<Long, Long> buckets = new HashMap<>();
        long width = valueDiff + 1;
        for (int index = 0; index < nums.length; ++index) {
            if (index > indexDiff) {
                // The window spans only the previous indexDiff positions;
                // retire the bucket of the value that just fell out of it.
                buckets.remove(Math.floorDiv(nums[(int) (index - indexDiff - 1)], width));
            }
            long value = nums[index];
            long bucket = Math.floorDiv(value, width);
            if (buckets.containsKey(bucket)) return true;
            // Neighbor buckets can hold values up to 2*valueDiff away, so
            // their occupants need a real distance comparison.
            Long below = buckets.get(bucket - 1);
            if (below != null && value - below <= valueDiff) return true;
            Long above = buckets.get(bucket + 1);
            if (above != null && above - value <= valueDiff) return true;
            buckets.put(bucket, value);
        }
        return false;
    }
}
