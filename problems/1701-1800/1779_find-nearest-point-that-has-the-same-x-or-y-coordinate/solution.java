class Solution {

    public int nearestValidPoint(int x, int y, int[][] points) {
        // A valid point already agrees with one coordinate, so its Manhattan
        // distance is just the absolute gap on the other coordinate.
        int bestDist = Integer.MAX_VALUE;
        int bestIndex = -1;
        for (int i = 0; i < points.length; i++) {
            int a = points[i][0];
            int b = points[i][1];
            if (a == x || b == y) {
                int dist = a == x ? Math.abs(b - y) : Math.abs(a - x);
                // Strict improvement only: an equal distance keeps the earlier
                // index, which is exactly the statement's tie rule.
                if (dist < bestDist) {
                    bestDist = dist;
                    bestIndex = i;
                }
            }
        }
        return bestIndex;
    }
}
