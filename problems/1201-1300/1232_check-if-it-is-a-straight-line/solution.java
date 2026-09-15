class Solution {

    public boolean checkStraightLine(int[][] coordinates) {
        int x1 = coordinates[0][0],
            y1 = coordinates[0][1];
        int x2 = coordinates[1][0],
            y2 = coordinates[1][1];
        // Cross product against the first two points: zero means the vector
        // is parallel to the fixed direction, vertical lines included.
        for (int i = 2; i < coordinates.length; ++i) {
            int x = coordinates[i][0],
                y = coordinates[i][1];
            if ((long) (x - x1) * (y2 - y1) != (long) (y - y1) * (x2 - x1)) return false;
        }
        return true;
    }
}
