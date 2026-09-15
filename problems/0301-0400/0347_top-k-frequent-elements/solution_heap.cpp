class Solution {
  public:
    vector<int> topKFrequent(vector<int> &nums, int k) {
        // One counting pass over the array.
        unordered_map<int, int> counts;
        for (int x : nums) {
            ++counts[x];
        }
        // Size-k min-heap of (count, value) pairs whose root is the
        // weakest keeper: smallest count, and among equal counts the
        // largest value — eviction order mirrors the final ranking. The
        // comparator is that order turned inside out, so the evict-first
        // item sits at priority_queue's top.
        auto evictFirst = [](const pair<int, int> &a, const pair<int, int> &b) {
            if (a.first != b.first)
                return a.first > b.first;
            return a.second < b.second;
        };
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(evictFirst)> heap(evictFirst);
        for (const auto &kv : counts) {
            pair<int, int> item = {kv.second, kv.first};
            if ((int)heap.size() < k) {
                heap.push(item);
                continue;
            }
            const pair<int, int> &root = heap.top();
            // Replace the root only when the newcomer outranks it:
            // higher count, or equal count and smaller value.
            if (item.first > root.first || (item.first == root.first && item.second < root.second)) {
                heap.pop();
                heap.push(item);
            }
        }
        vector<pair<int, int>> survivors;
        while (!heap.empty()) {
            survivors.push_back(heap.top());
            heap.pop();
        }
        // Survivors are exactly the top k by (higher count, then smaller
        // value); emit them in that order.
        sort(survivors.begin(), survivors.end(), [](const pair<int, int> &a, const pair<int, int> &b) {
            if (a.first != b.first)
                return a.first > b.first;
            return a.second < b.second;
        });
        vector<int> result;
        result.reserve(k);
        for (int i = 0; i < k && i < (int)survivors.size(); ++i) {
            result.push_back(survivors[i].second);
        }
        return result;
    }
};
