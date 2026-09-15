class Solution {
  public:
    vector<int> getOrder(vector<vector<int>> &tasks) {
        int n = (int)tasks.size();
        vector<int> byEnqueue(n);
        for (int i = 0; i < n; i++) {
            byEnqueue[i] = i;
        }
        // Indices pre-sorted by (enqueueTime, index): the arrival stream only moves forward.
        sort(byEnqueue.begin(), byEnqueue.end(), [&](int a, int b) {
            if (tasks[a][0] != tasks[b][0])
                return tasks[a][0] < tasks[b][0];
            return a < b;
        });
        // Min-heap ordered by (processingTime, index).
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> heap;
        vector<int> order;
        order.reserve(n);
        long long time = 0;
        int i = 0;
        while (i < n || !heap.empty()) {
            if (heap.empty()) {
                // CPU idle: jump straight to the next arrival instead of ticking.
                time = max(time, (long long)tasks[byEnqueue[i]][0]);
            }
            // Enqueue everything available at this instant BEFORE popping, so all
            // contenders compete under the same (processingTime, index) order.
            while (i < n && (long long)tasks[byEnqueue[i]][0] <= time) {
                int j = byEnqueue[i];
                heap.push({(long long)tasks[j][1], j});
                i++;
            }
            auto [proc, j] = heap.top(); // winner: shortest processing time, smallest index on ties
            heap.pop();
            order.push_back(j);
            time += proc; // clock advances by exactly the winner's duration
        }
        return order;
    }
};
