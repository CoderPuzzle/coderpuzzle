import java.util.List;

/** The hidden binary array (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: query(a, b, c, d) reports how the four
 * entries at those indices split, and length() reports the array's
 * size. The oracle enforces the problem's own 2n query budget itself,
 * independent of whatever budget the harness supplies. Solvers see only
 * the public API documented in the starter. */
public class ArrayReader {

    private final int[] nums;
    private long budget;

    public ArrayReader(List<Object> values, long budget) {
        this.nums = new int[values.size()];
        for (int i = 0; i < values.size(); i++) {
            this.nums[i] = ((Number) values.get(i)).intValue();
        }
        this.budget = 2L * this.nums.length;
    }

    public int query(int a, int b, int c, int d) {
        if (budget <= 0) {
            throw new IllegalStateException("ArrayReader query budget exhausted");
        }
        budget -= 1;
        int ones = nums[a] + nums[b] + nums[c] + nums[d];
        if (ones == 0 || ones == 4) {
            return 4;
        }
        if (ones == 1 || ones == 3) {
            return 2;
        }
        return 0;
    }

    public int length() {
        return nums.length;
    }
}
