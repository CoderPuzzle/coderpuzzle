class Solution {

    public int[][] seePeople(int[][] heights) {
        int m = heights.length;
        int n = heights[0].length;
        int[][] res = new int[m][n];

        // Count people visible to the right in each row.
        for (int i = 0; i < m; i++) {
            int[] st = new int[n];
            int top = 0;
            for (int j = n - 1; j >= 0; j--) {
                int x = heights[i][j];
                int cnt = 0;
                while (top > 0 && st[top - 1] < x) {
                    top--;
                    cnt += 1;
                }
                if (top > 0) cnt += 1;
                res[i][j] += cnt;
                while (top > 0 && st[top - 1] <= x) {
                    top--;
                }
                st[top++] = x;
            }
        }

        // Count people visible below in each column.
        for (int j = 0; j < n; j++) {
            int[] st = new int[m];
            int top = 0;
            for (int i = m - 1; i >= 0; i--) {
                int x = heights[i][j];
                int cnt = 0;
                while (top > 0 && st[top - 1] < x) {
                    top--;
                    cnt += 1;
                }
                if (top > 0) cnt += 1;
                res[i][j] += cnt;
                while (top > 0 && st[top - 1] <= x) {
                    top--;
                }
                st[top++] = x;
            }
        }

        return res;
    }
}
