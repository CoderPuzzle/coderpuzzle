import java.util.Arrays;

class Solution {

    public String[] createGrid(int m, int n) {
        String[] grid = new String[m];
        char[] top = new char[n];
        Arrays.fill(top, '.');
        grid[0] = new String(top);
        char[] rest = new char[n];
        Arrays.fill(rest, '#');
        rest[n - 1] = '.';
        for (int i = 1; i < m; i++) {
            grid[i] = new String(rest);
        }
        return grid;
    }
}
