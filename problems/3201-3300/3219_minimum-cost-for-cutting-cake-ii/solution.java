import java.util.Arrays;

class Solution {

    public long minimumCost(int m, int n, int[] horizontalCut, int[] verticalCut) {
        // Each line is priced once per perpendicular strip alive when it is
        // cut, and swapping two adjacent cuts of different families changes
        // the total by (cheaper - more expensive), so an optimal schedule
        // always takes the globally most expensive remaining line. Merge
        // both arrays largest-first, charging each horizontal cut times the
        // current vertical strip count and vice versa. Totals reach about
        // 2 * 10^13, so the accumulator widens to long.
        Arrays.sort(horizontalCut);
        Arrays.sort(verticalCut);
        long total = 0;
        long rowPieces = 1;
        long colPieces = 1;
        int i = m - 2;
        int j = n - 2;
        while (i >= 0 || j >= 0) {
            if (j < 0 || (i >= 0 && horizontalCut[i] >= verticalCut[j])) {
                total += (long) horizontalCut[i] * colPieces;
                i--;
                rowPieces++;
            } else {
                total += (long) verticalCut[j] * rowPieces;
                j--;
                colPieces++;
            }
        }
        return total;
    }
}
