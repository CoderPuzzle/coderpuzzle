import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public long minInversionCount(int[] nums, int k) {
        // Keep the current window as a sorted list. A sorted list makes the
        // slide's two rank questions direct binary searches: the position an
        // element occupies IS the number of elements smaller than it, and
        // the gap it is dropped into counts the elements greater than it.
        // The running inversion count moves by the same two terms the
        // Fenwick tree tracks, but each term is read off one bisection — no
        // tree, no compression, and the window itself stays materialized.
        // The trade is the O(k) element shift per insert and remove; with k
        // up to n that is quadratic in the worst case but so cache-friendly
        // that mid-size windows stay fast.
        //
        // Equal values need care at both ends: removing uses the leftmost
        // matching index so exactly one copy leaves, inserting uses the
        // rightmost so the newcomer lands after its equals and only pairs
        // with strictly larger survivors. The running count reaches
        // k * (k - 1) / 2 — past int range for large windows — so it
        // accumulates in long.
        List<Integer> window = new ArrayList<>(k);
        long inversions = 0;
        for (int i = 0; i < k; i++) {
            int pos = insertionEnd(window, nums[i]);
            inversions += window.size() - pos;
            window.add(pos, nums[i]);
        }
        long best = inversions;
        for (int right = k; right < nums.length; right++) {
            int outPos = Collections.binarySearch(window, nums[right - k]);
            if (outPos < 0) {
                outPos = -outPos - 1;
            } else {
                while (outPos > 0 && window.get(outPos - 1).equals(window.get(outPos))) {
                    outPos--;
                }
            }
            inversions -= outPos;
            window.remove(outPos);
            int pos = insertionEnd(window, nums[right]);
            inversions += window.size() - pos;
            window.add(pos, nums[right]);
            best = Math.min(best, inversions);
        }
        return best;
    }

    /** Rightmost insertion index: the element lands after all its equals. */
    private static int insertionEnd(List<Integer> window, int value) {
        int pos = Collections.binarySearch(window, value);
        if (pos < 0) {
            pos = -pos - 1;
        } else {
            while (pos < window.size() && window.get(pos).equals(value)) {
                pos++;
            }
        }
        return pos;
    }
}
