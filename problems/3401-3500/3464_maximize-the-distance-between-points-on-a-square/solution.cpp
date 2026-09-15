class Solution {
  public:
    int maxDistance(int side, vector<vector<int>> &points, int k) {
        long long L = 4LL * side;

        int n = (int)points.size();
        vector<long long> coords(n);
        for (int i = 0; i < n; i++) {
            coords[i] = perimeter(side, points[i][0], points[i][1]);
        }
        sort(coords.begin(), coords.end());
        vector<long long> arr(2 * n);
        for (int i = 0; i < n; i++) {
            arr[i] = coords[i];
            arr[i + n] = coords[i] + L;
        }

        long long lo = 0, hi = 2LL * side;
        while (lo < hi) {
            long long mid = lo + (hi - lo + 1) / 2;
            if (feasible(arr, n, k, mid, L)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return (int)lo;
    }

  private:
    long long perimeter(int side, int x, int y) {
        if (y == 0)
            return x;
        if (x == side)
            return (long long)side + y;
        if (y == side)
            return 2LL * side + (side - x);
        // x == 0
        return 3LL * side + (side - y);
    }

    bool feasible(vector<long long> &arr, int n, int k, long long d, long long L) {
        if (d == 0)
            return true;
        int total = 2 * n;
        vector<int> nxt(total);
        for (int j = 0; j < total; j++) {
            long long target = arr[j] + d;
            nxt[j] = (int)(lower_bound(arr.begin() + j + 1, arr.end(), target) - arr.begin());
        }
        for (int i = 0; i < n; i++) {
            int cnt = 1;
            int cur = i;
            bool ok = true;
            for (int t = 0; t < k - 1; t++) {
                int j = nxt[cur];
                if (j >= i + n) {
                    ok = false;
                    break;
                }
                cur = j;
                cnt++;
            }
            if (ok && cnt == k) {
                if (arr[cur] + d <= arr[i] + L) {
                    return true;
                }
            }
        }
        return false;
    }
};
