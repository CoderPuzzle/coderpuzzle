import java.util.ArrayDeque;
import java.util.concurrent.ThreadLocalRandom;

class Solution {

    // Walker alias table: n columns of height total, index i's own material
    // filling w[i] * n of its column and a donor's topping up the rest;
    // one uniform cell of the n * total grid lands on index i's material with
    // probability exactly w[i] / total.
    private final long[] height;
    private final int[] alias;
    private final int columns;
    private final long total;

    public Solution(int[] w) {
        int n = w.length;
        long total = 0;
        for (int weight : w) {
            total += weight;
        }
        columns = n;
        this.total = total;
        height = new long[n];
        alias = new int[n];
        ArrayDeque<Integer> small = new ArrayDeque<>();
        ArrayDeque<Integer> large = new ArrayDeque<>();
        for (int c = 0; c < n; c++) {
            height[c] = (long) w[c] * n;
            if (height[c] < total) {
                small.push(c);
            } else {
                large.push(c);
            }
        }
        while (!small.isEmpty() && !large.isEmpty()) {
            int under = small.pop();
            int over = large.pop();
            alias[under] = over;
            height[over] -= total - height[under];
            if (height[over] < total) {
                small.push(over);
            } else if (height[over] > total) {
                large.push(over);
            }
        }
    }

    public int pickIndex() {
        long cell = ThreadLocalRandom.current().nextLong(columns * total);
        int column = (int) (cell % columns);
        // level under the column's own material, else its alias
        return cell / columns < height[column] ? column : alias[column];
    }
}
