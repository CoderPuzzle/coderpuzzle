class Solution {

    public int minimumDistance(int[][] points) {
        int n = points.length;
        // Rotated coordinates u = x + y, v = x - y turn Manhattan
        // distance into max(|du|, |dv|); each axis then only needs its
        // extremes. With coordinates up to 1e8 the widest spread stays
        // below 4e8, safely inside an int.
        int[] u = new int[n];
        int[] v = new int[n];
        Integer[] orderU = new Integer[n];
        Integer[] orderV = new Integer[n];
        for (int i = 0; i < n; i++) {
            u[i] = points[i][0] + points[i][1];
            v[i] = points[i][0] - points[i][1];
            orderU[i] = i;
            orderV[i] = i;
        }
        java.util.Arrays.sort(orderU, (a, b) -> Integer.compare(u[a], u[b]));
        java.util.Arrays.sort(orderV, (a, b) -> Integer.compare(v[a], v[b]));
        int best = Integer.MAX_VALUE;
        for (int removed = 0; removed < n; removed++) {
            int loU = orderU[0] == removed ? orderU[1] : orderU[0];
            int hiU = orderU[n - 1] == removed ? orderU[n - 2] : orderU[n - 1];
            int loV = orderV[0] == removed ? orderV[1] : orderV[0];
            int hiV = orderV[n - 1] == removed ? orderV[n - 2] : orderV[n - 1];
            best = Math.min(best, Math.max(u[hiU] - u[loU], v[hiV] - v[loV]));
        }
        return best;
    }
}
