import java.util.Arrays;

class Solution {

    public int minOperations(int[][] grid, int x) {
        int size = grid.length * grid[0].length;
        int[] values = new int[size];
        int index = 0;
        int remainder = grid[0][0] % x;
        for (int[] row : grid) {
            for (int value : row) {
                if (value % x != remainder) return -1;
                values[index++] = value;
            }
        }

        Arrays.sort(values);
        int median = values[size / 2];
        long operations = 0;
        for (int value : values) {
            operations += Math.abs((long) value - median) / x;
        }
        return (int) operations;
    }
}
