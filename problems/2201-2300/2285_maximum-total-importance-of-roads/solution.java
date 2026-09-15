import java.util.Arrays;

class Solution {

    public long maximumImportance(int n, int[][] roads) {
        // Degrees in 64-bit: rank * degree reaches ~2.5e9, past INT32_MAX.
        long[] degrees = new long[n];
        for (int[] road : roads) {
            degrees[road[0]]++;
            degrees[road[1]]++;
        }
        Arrays.sort(degrees);
        long total = 0;
        for (int rank = 1; rank <= n; rank++) {
            total += (long) rank * degrees[rank - 1];
        }
        return total;
    }
}
