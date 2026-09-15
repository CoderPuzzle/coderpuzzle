import java.util.Arrays;

class Solution {

    public long maxTotal(int[] value, int[] limit) {
        // A limit-L element can only be taken while fewer than L elements
        // are active, and the moment the count reaches L the rest of its
        // group locks out forever — so each group contributes at most its
        // min(L, m) largest values. Sorting by value descending and capping
        // each group at L picks collects exactly those.
        int n = value.length;
        int[][] items = new int[n][2];
        for (int i = 0; i < n; ++i) {
            items[i][0] = value[i];
            items[i][1] = limit[i];
        }
        Arrays.sort(items, (a, b) -> a[0] != b[0] ? b[0] - a[0] : b[1] - a[1]);
        int[] taken = new int[n + 1];
        long total = 0;
        for (int[] item : items) {
            int v = item[0];
            int l = item[1];
            if (taken[l] < l) {
                ++taken[l];
                total += v;
            }
        }
        return total;
    }
}
