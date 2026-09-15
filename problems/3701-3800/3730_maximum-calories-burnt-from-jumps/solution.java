import java.util.Arrays;

class Solution {

    public long maxCaloriesBurnt(int[] heights) {
        // Sorted extremes alternate through the routine: the largest
        // remaining height takes each even index (descending), the smallest
        // takes each odd index (ascending), so every edge spans the widest
        // gap available and the first jump claims the tallest block.
        int[] s = heights.clone();
        Arrays.sort(s);
        int n = s.length;
        int[] arr = new int[n];
        int lo = 0,
            hi = n - 1;
        for (int index = 0; index < n; index++) {
            if (index % 2 == 0) {
                arr[index] = s[hi--];
            } else {
                arr[index] = s[lo++];
            }
        }
        // Squared gaps reach ~10^10 and totals approach 10^15: widen to
        // long before multiplying, an int square overflows at once.
        long total = (long) arr[0] * arr[0];
        for (int index = 1; index < n; index++) {
            long gap = arr[index - 1] - arr[index];
            total += gap * gap;
        }
        return total;
    }
}
