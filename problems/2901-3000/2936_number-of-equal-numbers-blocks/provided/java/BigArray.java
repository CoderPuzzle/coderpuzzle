import java.util.List;

/** The hidden big array (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: at(index) returns the value at a 64-bit
 * position and size() reports the 64-bit array length. The test case
 * describes nums by its maximal blocks — each a [value, count] pair —
 * and this oracle replays that description without ever materializing
 * the array. Solvers see only the public API documented in the starter. */
public class BigArray {

    private final long[] values;
    private final long[] starts;
    private final long total;
    private long budget;

    public BigArray(List<Object> blocks, long budget) {
        int runs = blocks.size();
        this.values = new long[runs];
        this.starts = new long[runs];
        long offset = 0;
        long previous = 0;
        for (int i = 0; i < runs; i++) {
            List<?> pair = (List<?>) blocks.get(i);
            long value = ((Number) pair.get(0)).longValue();
            long count = ((Number) pair.get(1)).longValue();
            if (i > 0 && value == previous) {
                throw new IllegalStateException("BigArray blocks must alternate values");
            }
            this.values[i] = value;
            this.starts[i] = offset;
            offset += count;
            previous = value;
        }
        this.total = offset;
        this.budget = budget;
    }

    public int at(long index) {
        if (budget <= 0) {
            throw new IllegalStateException("BigArray query budget exhausted");
        }
        budget -= 1;
        int lo = 0;
        int hi = starts.length - 1;
        int run = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (starts[mid] <= index) {
                run = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return (int) values[run];
    }

    public long size() {
        return total;
    }
}
