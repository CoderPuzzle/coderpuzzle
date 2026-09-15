class Solution {
  public:
    int beautifulPairRec(vector<int> &xs, vector<int> &ys, vector<int> &idx, vector<int> &tmp, int left, int right) {
        if (right - left <= 3) {
            int delta = INT_MAX;
            for (int a = left; a < right; a++)
                for (int b = a + 1; b < right; b++)
                    delta = min(delta, abs(xs[idx[a]] - xs[idx[b]]) + abs(ys[idx[a]] - ys[idx[b]]));
            sort(idx.begin() + left, idx.begin() + right, [&](int p, int q) { return ys[p] < ys[q]; });
            return delta;
        }
        int mid = left + (right - left) / 2;
        int middle = xs[idx[mid]];
        int delta = min(beautifulPairRec(xs, ys, idx, tmp, left, mid), beautifulPairRec(xs, ys, idx, tmp, mid, right));
        inplace_merge(idx.begin() + left, idx.begin() + mid, idx.begin() + right,
                      [&](int p, int q) { return ys[p] < ys[q]; });
        int length = 0;
        for (int pos = left; pos < right; pos++)
            if (abs(xs[idx[pos]] - middle) < delta)
                tmp[length++] = idx[pos];
        for (int pos = 0; pos < length; pos++)
            for (int follow = pos + 1; follow < length && ys[tmp[follow]] - ys[tmp[pos]] < delta; follow++)
                delta = min(delta, abs(xs[tmp[pos]] - xs[tmp[follow]]) + abs(ys[tmp[pos]] - ys[tmp[follow]]));
        return delta;
    }

    vector<int> beautifulPair(vector<int> &nums1, vector<int> &nums2) {
        int n = nums1.size();
        // Identical points sit at distance 0, the instant global minimum,
        // so a duplicate is answered directly from earliest occurrences.
        unordered_map<long long, int> first_seen;
        long long best_j = n, best_k = n;
        for (int i = 0; i < n; i++) {
            long long key = (long long)nums1[i] * 100001 + nums2[i];
            auto found = first_seen.find(key);
            if (found == first_seen.end()) {
                first_seen[key] = i;
            } else if ((long long)found->second * n + i < best_j * n + best_k) {
                best_j = found->second;
                best_k = i;
            }
        }
        if (best_j < n)
            return {(int)best_j, (int)best_k};

        // Closest pair under Manhattan distance via divide and conquer:
        // the conquer scan walks each strip point forward while the y-gap
        // is under the running bound, so every shorter cross pair is seen.
        vector<int> idx(n), tmp(n);
        for (int i = 0; i < n; i++)
            idx[i] = i;
        sort(idx.begin(), idx.end(),
             [&](int p, int q) { return nums1[p] != nums1[q] ? nums1[p] < nums1[q] : nums2[p] < nums2[q]; });
        int dist = beautifulPairRec(nums1, nums2, idx, tmp, 0, n);

        // With minimum distance d the points are pairwise >= d apart, so a
        // d-sided hash grid holds a bounded handful of points per cell and
        // each distance-d edge surfaces exactly once from earlier indices.
        unordered_map<long long, vector<int>> cells;
        for (int i = 0; i < n; i++) {
            long long cx = nums1[i] / dist, cy = nums2[i] / dist;
            for (long long gx = cx - 1; gx <= cx + 1; gx++)
                for (long long gy = cy - 1; gy <= cy + 1; gy++) {
                    auto bucket = cells.find(gx * 200003 + gy);
                    if (bucket == cells.end())
                        continue;
                    for (int j : bucket->second) {
                        int gap = abs(nums1[i] - nums1[j]) + abs(nums2[i] - nums2[j]);
                        if (gap == dist && j < best_j) {
                            best_j = j;
                            best_k = i;
                        }
                    }
                }
            cells[(cx * 200003 + cy)].push_back(i);
        }
        return {(int)best_j, (int)best_k};
    }
};
