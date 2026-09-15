class Solution {

    public int[] findColumnWidth(int[][] grid) {
        // Width of a value = digits of its magnitude plus one sign character
        // when negative. Repeated division by 10 counts the digits without
        // materializing strings, and every column keeps a running maximum.
        // |value| never reaches Integer.MIN_VALUE, so Math.abs is safe.
        int[] widths = new int[grid[0].length];
        for (int[] row : grid) {
            for (int column = 0; column < row.length; ++column) {
                int width = row[column] < 0 ? 1 : 0;
                int rest = Math.abs(row[column]);
                do {
                    ++width;
                    rest /= 10;
                } while (rest > 0);
                widths[column] = Math.max(widths[column], width);
            }
        }
        return widths;
    }
}
