import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public double[] medianSlidingWindow(int[] nums, int k) {
        // One sorted list mirrors the window: binary insertion keeps it
        // sorted without ever re-sorting a whole window.
        List<Integer> window = new ArrayList<>();
        double[] out = new double[nums.length - k + 1];
        int oi = 0;
        for (int i = 0; i < nums.length; i++) {
            int pos = Collections.binarySearch(window, nums[i]);
            if (pos < 0) pos = -(pos + 1);
            window.add(pos, nums[i]);
            // Evict the leftmost occurrence of the outgoing value — equal
            // elements are interchangeable, so the multiset stays exact.
            if (i >= k) {
                int p = Collections.binarySearch(window, nums[i - k]);
                if (p < 0) p = -(p + 1);
                window.remove(p);
            }
            // Eviction already ran, so exactly k values are present here;
            // the median is then a plain index lookup (middle pair for
            // even k, averaged as a double).
            if (i >= k - 1) {
                if ((k & 1) == 1) {
                    out[oi++] = (double) window.get(k / 2);
                } else {
                    out[oi++] = ((long) window.get(k / 2 - 1) + (long) window.get(k / 2)) / 2.0;
                }
            }
        }
        return out;
    }
}
