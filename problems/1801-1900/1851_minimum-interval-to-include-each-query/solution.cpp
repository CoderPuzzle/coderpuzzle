class Solution {
  public:
    vector<int> minInterval(vector<vector<int>> &intervals, vector<int> &queries) {
        vector<vector<int>> sorted = intervals;
        sort(sorted.begin(), sorted.end());
        // Sweep queries in ascending order so each interval's life is a contiguous
        // stretch of the sweep: live from its left end, dead past its right end.
        vector<int> order((int)queries.size());
        for (int j = 0; j < (int)queries.size(); j++) {
            order[j] = j;
        }
        sort(order.begin(), order.end(), [&](int a, int b) { return queries[a] < queries[b]; });
        // Min-heap of (size, right) pairs ordered by size.
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> heap;
        vector<int> answers((int)queries.size());
        int i = 0;
        int n = (int)sorted.size();
        for (int j : order) {
            int q = queries[j];
            // Intervals whose left end has been reached are now live (size, right).
            while (i < n && sorted[i][0] <= q) {
                heap.push({sorted[i][1] - sorted[i][0] + 1, sorted[i][1]});
                i++;
            }
            // Lazy deletion: the top dies past its right end, and since queries only
            // grow it fails every later query too — discarding it is permanent.
            while (!heap.empty() && heap.top().second < q) {
                heap.pop();
            }
            // Surviving top = smallest interval containing q.
            answers[j] = heap.empty() ? -1 : heap.top().first;
        }
        return answers;
    }
};
