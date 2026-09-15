class Solution {
  public:
    vector<long long> maximumSumQueries(vector<int> &nums1, vector<int> &nums2, vector<vector<int>> &queries) {
        int n = nums1.size();
        vector<pair<int, int>> points(n);
        for (int j = 0; j < n; j++) {
            points[j] = {nums1[j], nums2[j]};
        }
        sort(points.begin(), points.end(),
             [](const pair<int, int> &a, const pair<int, int> &b) { return a.first > b.first; });
        int q = queries.size();
        vector<int> order(q);
        for (int i = 0; i < q; i++) {
            order[i] = i;
        }
        sort(order.begin(), order.end(), [&](int a, int b) { return queries[a][0] > queries[b][0]; });

        vector<long long> keys;
        vector<long long> bests;
        keys.reserve(n);
        bests.reserve(n);

        vector<long long> answer(q, -1);
        int pointIndex = 0;
        for (int qi : order) {
            int boundX = queries[qi][0];
            int boundY = queries[qi][1];
            while (pointIndex < n && points[pointIndex].first >= boundX) {
                long long x = points[pointIndex].first;
                long long y = points[pointIndex].second;
                insert(keys, bests, y, x + y);
                pointIndex++;
            }
            int pos = lower_bound(keys.begin(), keys.end(), (long long)boundY) - keys.begin();
            if (pos < static_cast<int>(keys.size())) {
                answer[qi] = bests[pos];
            }
        }
        return answer;
    }

  private:
    void insert(vector<long long> &keys, vector<long long> &bests, long long y, long long total) {
        int pos = lower_bound(keys.begin(), keys.end(), y) - keys.begin();
        if (pos < static_cast<int>(keys.size()) && keys[pos] == y) {
            if (bests[pos] >= total) {
                return;
            }
            keys.erase(keys.begin() + pos);
            bests.erase(bests.begin() + pos);
        }
        if (pos < static_cast<int>(keys.size()) && bests[pos] >= total) {
            return;
        }
        while (pos > 0 && bests[pos - 1] <= total) {
            keys.erase(keys.begin() + pos - 1);
            bests.erase(bests.begin() + pos - 1);
            pos--;
        }
        keys.insert(keys.begin() + pos, y);
        bests.insert(bests.begin() + pos, total);
    }
};
