/** Problem-provided oracle (InfiniteStream). Compiled with every submission
 * by the judge; never editable in the editor. This file is the hidden
 * implementation — solvers see only the public API documented in the
 * starter. Constructed from the case state (bits, budget and the query
 * budget). */
import java.util.List;

public class InfiniteStream {

    private final int[] bits;
    private long budget;
    private int position;

    public InfiniteStream(List<Object> values, long budget) {
        this.bits = new int[values.size()];
        for (int i = 0; i < values.size(); i++) {
            this.bits[i] = ((Number) values.get(i)).intValue();
        }
        this.budget = budget;
    }

    public int next() {
        if (budget <= 0) {
            throw new IllegalStateException("InfiniteStream query budget exhausted");
        }
        budget -= 1;
        return bits[position++];
    }
}
