import java.util.List;

/** The hidden array (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: compareSub(l, r, x, y) compares the sum
 * of arr[l..r] with the sum of arr[x..y], under a 20-call budget;
 * length() reports the array size for free. Solvers see only the
 * public API documented in the starter. */
public class ArrayReader {

    private final int[] arr;
    private long budget;

    public ArrayReader(List<Object> arr, long budget) {
        this.arr = new int[arr.size()];
        for (int i = 0; i < arr.size(); i++) {
            this.arr[i] = ((Number) arr.get(i)).intValue();
        }
        this.budget = budget;
    }

    public int compareSub(int l, int r, int x, int y) {
        if (budget <= 0) {
            throw new IllegalStateException("ArrayReader query budget exhausted");
        }
        budget -= 1;
        long left = 0;
        for (int i = l; i <= r; i++) {
            left += arr[i];
        }
        long right = 0;
        for (int i = x; i <= y; i++) {
            right += arr[i];
        }
        if (left > right) {
            return 1;
        }
        if (left < right) {
            return -1;
        }
        return 0;
    }

    public int length() {
        return arr.length;
    }
}
