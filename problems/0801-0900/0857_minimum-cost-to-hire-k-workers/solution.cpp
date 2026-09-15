class Solution {
  public:
    double mincostToHireWorkers(vector<int> &quality, vector<int> &wage, int k) {
        int n = quality.size();
        vector<pair<int, int>> workers(n); // (wage, quality)
        for (int i = 0; i < n; i++) {
            workers[i] = {wage[i], quality[i]};
        }
        stable_sort(workers.begin(), workers.end(), [](const pair<int, int> &a, const pair<int, int> &b) {
            return (double)a.first / a.second < (double)b.first / b.second;
        });

        priority_queue<int> heap; // max-heap of chosen qualities
        long long totalQuality = 0;
        double best = numeric_limits<double>::infinity();
        for (auto &[w, q] : workers) {
            heap.push(q);
            totalQuality += q;
            if ((int)heap.size() > k) {
                totalQuality -= heap.top();
                heap.pop();
            }
            if ((int)heap.size() == k) {
                double cost = totalQuality * ((double)w / q);
                if (cost < best) {
                    best = cost;
                }
            }
        }
        return best;
    }
};
