class Solution {

    public int minSwaps(int[][] grid) {
        int n = grid.length;
        int[] zeros = new int[n];
        for (int i = 0; i < n; i++) {
            zeros[i] = trailingZeros(grid[i]);
        }

        int swaps = 0;
        for (int i = 0; i < n; i++) {
            int needed = n - i - 1;
            if (zeros[i] >= needed) {
                continue;
            }
            int j = i + 1;
            while (j < n && zeros[j] < needed) {
                j++;
            }
            if (j == n) {
                return -1;
            }
            while (j > i) {
                int temp = zeros[j];
                zeros[j] = zeros[j - 1];
                zeros[j - 1] = temp;
                j--;
                swaps++;
            }
        }
        return swaps;
    }

    private int trailingZeros(int[] row) {
        int count = 0;
        for (int i = row.length - 1; i >= 0; i--) {
            if (row[i] != 0) {
                break;
            }
            count++;
        }
        return count;
    }
}
