import java.util.*;

class Solution {

    // Every value is non-negative, so an optimal selection can be found
    // among each row's top limits[i] values: pool those candidates, sort
    // descending, and sum the first k. The sum may reach
    // 250000 * 10^5 = 2.5e10, so accumulate in a long.
    public long maxSum(int[][] grid, int[] limits, int k) {
        List<Integer> pool = new ArrayList<>();
        for (int i = 0; i < grid.length; i++) {
            int[] row = grid[i].clone();
            Arrays.sort(row);
            for (int j = row.length - 1; j >= row.length - limits[i] && j >= 0; j--) {
                pool.add(row[j]);
            }
        }
        Collections.sort(pool, Collections.reverseOrder());
        long total = 0;
        for (int j = 0; j < k && j < pool.size(); j++) {
            total += pool.get(j);
        }
        return total;
    }
}
