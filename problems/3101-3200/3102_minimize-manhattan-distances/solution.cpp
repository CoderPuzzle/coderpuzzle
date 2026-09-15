class Solution {
  public:
    int minimumDistance(vector<vector<int>> &points) {
        int n = static_cast<int>(points.size());
        // Rotated coordinates u = x + y, v = x - y turn Manhattan
        // distance into max(|du|, |dv|); each axis then only needs its
        // extremes. With coordinates up to 1e8 the widest spread stays
        // below 4e8, safely inside an int.
        vector<long long> u(n), v(n);
        vector<int> orderU(n), orderV(n);
        for (int i = 0; i < n; i++) {
            u[i] = points[i][0] + points[i][1];
            v[i] = points[i][0] - points[i][1];
            orderU[i] = i;
            orderV[i] = i;
        }
        sort(orderU.begin(), orderU.end(), [&](int a, int b) { return u[a] < u[b]; });
        sort(orderV.begin(), orderV.end(), [&](int a, int b) { return v[a] < v[b]; });
        int best = INT_MAX;
        for (int removed = 0; removed < n; removed++) {
            int loU = orderU[0] == removed ? orderU[1] : orderU[0];
            int hiU = orderU[n - 1] == removed ? orderU[n - 2] : orderU[n - 1];
            int loV = orderV[0] == removed ? orderV[1] : orderV[0];
            int hiV = orderV[n - 1] == removed ? orderV[n - 2] : orderV[n - 1];
            best = min(best, static_cast<int>(max(u[hiU] - u[loU], v[hiV] - v[loV])));
        }
        return best;
    }
};
