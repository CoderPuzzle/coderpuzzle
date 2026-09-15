import java.util.Arrays;

class Solution {

    public int countCoveredBuildings(int n, int[][] buildings) {
        // Per x-line: extreme y values; per y-line: extreme x values. A
        // building is covered exactly when it is strictly inside both.
        int[] rowMinY = new int[n + 1],
            rowMaxY = new int[n + 1];
        int[] colMinX = new int[n + 1],
            colMaxX = new int[n + 1];
        Arrays.fill(rowMinY, n + 1);
        Arrays.fill(colMinX, n + 1);
        for (int[] b : buildings) {
            int x = b[0],
                y = b[1];
            if (y < rowMinY[x]) rowMinY[x] = y;
            if (y > rowMaxY[x]) rowMaxY[x] = y;
            if (x < colMinX[y]) colMinX[y] = x;
            if (x > colMaxX[y]) colMaxX[y] = x;
        }
        int covered = 0;
        for (int[] b : buildings) {
            int x = b[0],
                y = b[1];
            if (rowMinY[x] < y && y < rowMaxY[x] && colMinX[y] < x && x < colMaxX[y]) covered++;
        }
        return covered;
    }
}
