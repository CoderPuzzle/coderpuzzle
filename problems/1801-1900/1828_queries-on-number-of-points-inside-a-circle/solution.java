class Solution {

    // A point lies in the circle exactly when its squared euclidean
    // distance to the center is at most r*r. Squaring keeps everything
    // in integers (values stay below 2*500*500), so border points are
    // judged exactly where sqrt rounding could misclassify them.
    public int[] countPoints(int[][] points, int[][] queries) {
        int[] answer = new int[queries.length];
        for (int j = 0; j < queries.length; j++) {
            int xj = queries[j][0],
                yj = queries[j][1],
                rr = queries[j][2] * queries[j][2];
            int count = 0;
            for (int[] p : points) {
                int dx = p[0] - xj,
                    dy = p[1] - yj;
                if (dx * dx + dy * dy <= rr) count++;
            }
            answer[j] = count;
        }
        return answer;
    }
}
