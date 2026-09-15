class Solution {

    public int countLatticePoints(int[][] circles) {
        boolean[][] covered = new boolean[201][201];
        for (int[] circle : circles) {
            int x = circle[0],
                y = circle[1],
                r = circle[2];
            for (int px = x - r; px <= x + r; px++) {
                for (int py = y - r; py <= y + r; py++) {
                    int dx = px - x,
                        dy = py - y;
                    if ((long) dx * dx + (long) dy * dy <= (long) r * r) {
                        covered[px][py] = true;
                    }
                }
            }
        }
        int count = 0;
        for (boolean[] row : covered) {
            for (boolean cell : row) {
                if (cell) {
                    count++;
                }
            }
        }
        return count;
    }
}
