class Solution {
  public:
    long long minimumCost(int m, int n, vector<int> &horizontalCut, vector<int> &verticalCut) {
        // Each line is priced once per perpendicular strip alive when it is
        // cut, and swapping two adjacent cuts of different families changes
        // the total by (cheaper - more expensive), so an optimal schedule
        // always takes the globally most expensive remaining line. Merge
        // both arrays largest-first, charging each horizontal cut times the
        // current vertical strip count and vice versa. Totals reach about
        // 2 * 10^13, so the accumulator widens to long long.
        sort(horizontalCut.begin(), horizontalCut.end());
        sort(verticalCut.begin(), verticalCut.end());
        long long total = 0;
        long long rowPieces = 1;
        long long colPieces = 1;
        int i = m - 2;
        int j = n - 2;
        while (i >= 0 || j >= 0) {
            if (j < 0 || (i >= 0 && horizontalCut[i] >= verticalCut[j])) {
                total += (long long)horizontalCut[i] * colPieces;
                i--;
                rowPieces++;
            } else {
                total += (long long)verticalCut[j] * rowPieces;
                j--;
                colPieces++;
            }
        }
        return total;
    }
};
