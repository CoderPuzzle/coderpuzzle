class Solution {
  public:
    vector<int> resultsArray(vector<vector<int>> &queries, int k) {
        // Max-heap of the k smallest distances so far; its top is the kth
        // nearest once k obstacles have arrived. Distances reach 2 * 10^9,
        // so they are computed and stored as long long.
        priority_queue<long long> heap;
        vector<int> result;
        result.reserve(queries.size());
        for (auto &query : queries) {
            long long d = abs((long long)query[0]) + abs((long long)query[1]);
            if ((int)heap.size() < k) {
                heap.push(d);
            } else if (heap.top() > d) {
                heap.pop();
                heap.push(d);
            }
            // A distance is at most 2 * 10^9, which fits an int exactly.
            result.push_back((int)heap.size() == k ? (int)heap.top() : -1);
        }
        return result;
    }
};
