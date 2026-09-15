import java.util.*;

class SparseVector {

    // A sparse vector keeps only its nonzero (index, value) pairs — the
    // indices arrive in increasing order by construction — so a vector of
    // length 10^5 with three nonzero entries stores three pairs. The dot
    // product then merges the two sorted pair lists with two cursors:
    // equal indices contribute one product and advance both cursors, a
    // smaller index advances alone because its partner there is zero. The
    // bound 10^5 * 100 * 100 = 10^9 still fits an int.
    private final List<int[]> pairs = new ArrayList<>();

    public SparseVector(int[] nums) {
        for (int index = 0; index < nums.length; index++) {
            if (nums[index] != 0) {
                pairs.add(new int[] { index, nums[index] });
            }
        }
    }

    // Return the dotProduct of two sparse vectors
    public int dotProduct(SparseVector vec) {
        int total = 0;
        int left = 0;
        int right = 0;
        while (left < pairs.size() && right < vec.pairs.size()) {
            int[] first = pairs.get(left);
            int[] second = vec.pairs.get(right);
            if (first[0] == second[0]) {
                total += first[1] * second[1];
                left++;
                right++;
            } else if (first[0] < second[0]) {
                left++;
            } else {
                right++;
            }
        }
        return total;
    }
}
