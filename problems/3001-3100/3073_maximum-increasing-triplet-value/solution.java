import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int maximumTripletValue(int[] nums) {
        int n = nums.length;
        // Greatest element strictly to the right of each index.
        int[] suffix = new int[n];
        suffix[n - 1] = nums[n - 1];
        for (int k = n - 2; k >= 0; --k) {
            suffix[k] = Math.max(suffix[k + 1], nums[k]);
        }
        // Fenwick tree over compressed ranks, storing prefix maxima of the
        // values inserted so far; query(rank - 1) yields the greatest earlier
        // value strictly smaller than nums[j].
        List<Integer> distinct = new ArrayList<>();
        for (int value : nums) {
            distinct.add(value);
        }
        Collections.sort(distinct);
        int size = 1;
        for (int i = 1; i < distinct.size(); ++i) {
            if (!distinct.get(i).equals(distinct.get(i - 1))) {
                distinct.set(size++, distinct.get(i));
            }
        }
        Map<Integer, Integer> rank = new HashMap<>();
        for (int i = 0; i < size; ++i) {
            rank.put(distinct.get(i), i + 1);
        }
        int[] tree = new int[size + 1];

        // Every triplet value nums[i] - nums[j] + nums[k] stays within
        // (-10^9, 10^9) because nums[i] < nums[j] < nums[k] <= 10^9.
        int best = Integer.MIN_VALUE;
        update(tree, size, rank.get(nums[0]), nums[0]);
        for (int j = 1; j < n - 1; ++j) {
            int left = query(tree, rank.get(nums[j]) - 1);
            if (left > 0 && nums[j] < suffix[j + 1]) {
                best = Math.max(best, left - nums[j] + suffix[j + 1]);
            }
            update(tree, size, rank.get(nums[j]), nums[j]);
        }
        return best;
    }

    private void update(int[] tree, int size, int i, int value) {
        for (; i <= size; i += i & -i) {
            tree[i] = Math.max(tree[i], value);
        }
    }

    private int query(int[] tree, int i) {
        int best = 0;
        for (; i > 0; i -= i & -i) {
            best = Math.max(best, tree[i]);
        }
        return best;
    }
}
