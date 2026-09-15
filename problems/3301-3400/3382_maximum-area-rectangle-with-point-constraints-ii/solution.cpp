class Solution {
  public:
    // Sweep columns right-to-left. Compress both axes; a candidate
    // rectangle's left edge is two consecutive points (in y order) of one
    // column. The nearest column to the right holding any point with y in
    // [y1, y2] is the only possible right edge: any farther column would
    // keep that nearest point inside or on the border. A min segment tree
    // over compressed y, seeded with column indices as columns are passed,
    // answers "nearest column with a point in y-range [a, b]" as a
    // range-min query. The right column must hold exactly y1 and y2 inside
    // the range (both corners, nothing between or on the border).
    long long maxRectangleArea(vector<int> &xCoord, vector<int> &yCoord) {
        int n = xCoord.size();
        vector<int> xs = xCoord;
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
        vector<int> ys = yCoord;
        sort(ys.begin(), ys.end());
        ys.erase(unique(ys.begin(), ys.end()), ys.end());
        int m = xs.size();
        int k = ys.size();
        vector<int> cx(n), cy(n);
        for (int i = 0; i < n; i++) {
            cx[i] = lower_bound(xs.begin(), xs.end(), xCoord[i]) - xs.begin();
            cy[i] = lower_bound(ys.begin(), ys.end(), yCoord[i]) - ys.begin();
        }
        vector<int> idx(n);
        iota(idx.begin(), idx.end(), 0);
        sort(idx.begin(), idx.end(), [&](int a, int b) {
            if (cx[a] != cx[b])
                return cx[a] < cx[b];
            return cy[a] < cy[b];
        });
        vector<vector<int>> cols;
        int p = 0;
        while (p < n) {
            int q = p + 1;
            while (q < n && cx[idx[q]] == cx[idx[p]])
                q++;
            vector<int> col;
            for (int t = p; t < q; t++)
                col.push_back(cy[idx[t]]);
            cols.push_back(col);
            p = q;
        }
        int size = 1;
        while (size < k)
            size *= 2;
        int inf = m;
        vector<int> tree(2 * size, inf);
        long long best = -1;
        for (int c = m - 1; c >= 0; c--) {
            vector<int> &col = cols[c];
            for (int t = 0; t + 1 < (int)col.size(); t++) {
                int a = col[t], b = col[t + 1];
                int res = inf;
                for (int l = a + size, r = b + size + 1; l < r; l >>= 1, r >>= 1) {
                    if (l & 1) {
                        res = min(res, tree[l]);
                        l++;
                    }
                    if (r & 1) {
                        r--;
                        res = min(res, tree[r]);
                    }
                }
                if (res < inf) {
                    vector<int> &arr = cols[res];
                    int lo = lower_bound(arr.begin(), arr.end(), a) - arr.begin();
                    int hi = lower_bound(arr.begin(), arr.end(), b + 1) - arr.begin();
                    if (hi - lo == 2 && arr[lo] == a && arr[lo + 1] == b) {
                        long long area = 1LL * (xs[res] - xs[c]) * (ys[b] - ys[a]);
                        best = max(best, area);
                    }
                }
            }
            for (int yy : col) {
                for (int i = yy + size; i > 0 && tree[i] > c; i >>= 1)
                    tree[i] = c;
            }
        }
        return best;
    }
};
