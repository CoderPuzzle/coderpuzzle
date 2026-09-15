/** Problem-provided oracle (ArrayReader). Compiled with every submission
 * by the judge; never editable in the editor. This file is the hidden
 * implementation — solvers see only the public API documented in the
 * starter. Constructed from the case state (arr, budget and the query
 * budget). */
import java.util.List;

public class ArrayReader {
    public static final int SENTINEL = Integer.MAX_VALUE;
    private final int[] arr;
    private long budget;

    public ArrayReader(List<Object> values, long budget) {
        this.arr = new int[values.size()];
        for (int i = 0; i < values.size(); i++) {
            this.arr[i] = ((Number) values.get(i)).intValue();
        }
        this.budget = budget;
    }

    public int get(int index) {
        if (budget <= 0) {
            throw new IllegalStateException("ArrayReader query budget exhausted");
        }
        budget -= 1;
        return index >= 0 && index < arr.length ? arr[index] : SENTINEL;
    }
}
