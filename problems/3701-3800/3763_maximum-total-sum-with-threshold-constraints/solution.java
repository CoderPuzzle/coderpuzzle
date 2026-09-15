import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public long maxSum(int[] nums, int[] threshold) {
        // An element unlocks when step reaches its threshold and stays
        // usable forever after. Bucket indices by unlock step; everything
        // at threshold 1 starts in the max-heap of usable values.
        int n = nums.length;
        List<List<Integer>> waiting = new ArrayList<>();
        for (int t = 0; t <= n; ++t) {
            waiting.add(new ArrayList<>());
        }
        PriorityQueue<int[]> live = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return a[0] - b[0];
            return a[1] - b[1];
        });
        for (int i = 0; i < n; ++i) {
            if (threshold[i] <= 1) {
                live.offer(new int[] { -nums[i], i });
            } else {
                waiting.get(threshold[i]).add(i);
            }
        }
        long total = 0;
        int step = 1;
        while (true) {
            // Fold in this step's unlocks, then stop if nothing is usable.
            if (step <= n) {
                for (int i : waiting.get(step)) {
                    live.offer(new int[] { -nums[i], i });
                }
            }
            if (live.isEmpty()) break;
            total += -live.poll()[0];
            ++step;
        }
        return total;
    }
}
