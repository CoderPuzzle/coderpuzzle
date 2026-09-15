import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minimumDistance(int[] nums) {
        // The three pairwise gaps of a good tuple telescope to twice the
        // span between its outermost indices, so the closest tuple is the
        // one whose outermost same-value indices are nearest. Every value
        // gets its own bucket of indices, filled in one left-to-right pass
        // so each bucket comes out sorted for free.
        int n = nums.length;
        List<List<Integer>> groups = new ArrayList<>();
        for (int value = 0; value <= n; value++) {
            groups.add(new ArrayList<>());
        }
        for (int index = 0; index < n; index++) {
            groups.get(nums[index]).add(index);
        }
        // Inside a sorted bucket no triple beats some consecutive window:
        // the two entries immediately following any entry sit no later than
        // the other two entries of any triple opened there, so their window
        // spans no more.
        int best = -1;
        for (List<Integer> indices : groups) {
            for (int start = 0; start + 2 < indices.size(); start++) {
                int span = indices.get(start + 2) - indices.get(start);
                if (best == -1 || span < best) {
                    best = span;
                }
            }
        }
        // The best span stays unset unless some value occurs at least three
        // times; otherwise no good tuple exists.
        return best == -1 ? -1 : 2 * best;
    }
}
