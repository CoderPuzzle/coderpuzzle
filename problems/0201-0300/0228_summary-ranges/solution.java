import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] summaryRanges(int[] nums) {
        List<String> ranges = new ArrayList<>();
        int i = 0;
        while (i < nums.length) {
            int start = i;
            // The run extends while the next value is exactly one past the
            // current one. The guard short-circuits, so the +1 is only
            // evaluated when a successor exists — and that successor is
            // strictly larger, capping nums[i] below the 32-bit maximum.
            while (i + 1 < nums.length && nums[i + 1] == nums[i] + 1) {
                ++i;
            }
            // The run [nums[start], nums[i]] is maximal once the extension
            // stops; equal endpoints collapse to the bare "a" form.
            if (nums[start] == nums[i]) {
                ranges.add(Integer.toString(nums[start]));
            } else {
                ranges.add(nums[start] + "->" + nums[i]);
            }
            ++i;
        }
        return ranges.toArray(new String[0]);
    }
}
