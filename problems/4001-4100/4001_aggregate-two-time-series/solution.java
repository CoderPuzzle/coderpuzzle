import java.util.Arrays;

class Solution {

    public long[][] aggregateTimeSeries(int[][] series1, int[][] series2) {
        long[][] merged = new long[series1.length + series2.length][];
        int i = series1.length - 1;
        int j = series2.length - 1;
        int k = merged.length;
        long value1 = 0;
        long value2 = 0;
        // Sweep the union of timestamps from right to left. Each running
        // value is the last value its series contributed, which for every
        // timestamp still ahead of the cursor is exactly that series' next
        // available value; a series not yet reached contributes 0. Sums
        // reach 2e9, so values and results are held in long.
        while (i >= 0 || j >= 0) {
            long ts;
            if (j < 0 || (i >= 0 && series1[i][0] >= series2[j][0])) {
                ts = series1[i][0];
                value1 = series1[i][1];
                --i;
                if (j >= 0 && series2[j][0] == ts) {
                    value2 = series2[j][1];
                    --j;
                }
            } else {
                ts = series2[j][0];
                value2 = series2[j][1];
                --j;
            }
            merged[--k] = new long[] { ts, value1 + value2 };
        }
        // Shared timestamps emit one pair, not two — trim the unused head.
        return Arrays.copyOfRange(merged, k, merged.length);
    }
}
