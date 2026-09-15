import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {

    public int earliestSecondToMarkIndices(int[] nums, int[] changeIndices) {
        // Binary search the horizon: finishing within t seconds also
        // finishes within t + 1.
        int lo = 1;
        int hi = changeIndices.length;
        if (!canFinish(nums, changeIndices, hi)) {
            return -1;
        }
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (canFinish(nums, changeIndices, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean canFinish(int[] nums, int[] changeIndices, int t) {
        int n = nums.length;
        // Fewer seconds than indices can never mark them all.
        if (t < n) {
            return false;
        }
        // First occurrence of every index within [1, t]: clearing at the
        // earliest chance dominates any later pin, since an earlier
        // set-second only relaxes where the mark may land.
        Map<Integer, Integer> first = new HashMap<>();
        for (int s = 0; s < t; ++s) {
            first.putIfAbsent(changeIndices[s], s + 1);
        }
        List<Integer> deadlines = new ArrayList<>(first.values());
        deadlines.sort(Collections.reverseOrder());
        // Sweep pinned seconds latest to earliest, banking each clearance's
        // saving of nums[v] - 1 (one set-op replaces the whole decrement
        // chain). Every suffix of chosen clearances needs distinct marks
        // after its deadline outside its own pins, capping the suffix at
        // half the window 2 * chosen <= t - f + 1; on a breach give back
        // the banked clearance with the smallest saving.
        PriorityQueue<Integer> bank = new PriorityQueue<>();
        long saved = 0;
        int chosen = 0;
        for (int f : deadlines) {
            int c = nums[changeIndices[f - 1] - 1];
            if (c < 2) {
                continue;
            }
            bank.offer(c);
            saved += c - 1;
            ++chosen;
            while (2L * chosen > t - f + 1) {
                saved -= bank.poll() - 1;
                --chosen;
            }
        }
        // Uncleared indices keep their decrement chains; the surviving work
        // plus one mark per index must fit into [1, t]. Values reach
        // n * 10^9, so all accounting stays in long.
        long total = n;
        for (int x : nums) {
            total += x;
        }
        return total - saved <= t;
    }
}
