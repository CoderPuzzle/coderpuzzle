class Solution {
  public:
    int eatenApples(vector<int> &apples, vector<int> &days) {
        int n = apples.size();
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
        int eaten = 0;
        // Greedy: always eat from the soonest-rotting batch. Exchange argument
        // — swapping a later-rotting apple for an earlier-rotting one never
        // reduces the total — so a min-heap keyed by rot day is optimal.
        for (int i = 0; i < n; i++) {
            if (apples[i] > 0) {
                heap.push({i + days[i], apples[i]});
            }
            // Purge batches whose rot day has arrived (inedible from day
            // i + days[i] on).
            while (!heap.empty() && heap.top().first <= i) {
                heap.pop();
            }
            // Eat from the front batch; push it back minus one if any remain.
            if (!heap.empty()) {
                auto [rotDay, count] = heap.top();
                heap.pop();
                eaten++;
                if (count > 1) {
                    heap.push({rotDay, count - 1});
                }
            }
        }
        // After day n no new apples appear: keep purging and eating one apple
        // per day until every batch has rotted or been eaten.
        int day = n;
        while (!heap.empty()) {
            while (!heap.empty() && heap.top().first <= day) {
                heap.pop();
            }
            if (heap.empty()) {
                break;
            }
            auto [rotDay, count] = heap.top();
            heap.pop();
            eaten++;
            if (count > 1) {
                heap.push({rotDay, count - 1});
            }
            day++;
        }
        return eaten;
    }
};
