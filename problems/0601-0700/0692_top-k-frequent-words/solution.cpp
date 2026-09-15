class Solution {
  public:
    vector<string> topKFrequent(vector<string> &words, int k) {
        // One counting pass over the array.
        unordered_map<string, int> counts;
        for (const auto &w : words) {
            ++counts[w];
        }
        // Size-k min-heap of (count, word) pairs whose root is the
        // weakest keeper: smallest count, and among equal counts the
        // largest word — eviction order mirrors the final ranking. The
        // comparator is that order turned inside out, so the evict-first
        // item sits at priority_queue's top.
        auto evictFirst = [](const pair<int, string> &a, const pair<int, string> &b) {
            if (a.first != b.first)
                return a.first > b.first;
            return a.second < b.second;
        };
        priority_queue<pair<int, string>, vector<pair<int, string>>, decltype(evictFirst)> heap(evictFirst);
        for (const auto &kv : counts) {
            pair<int, string> item = {kv.second, kv.first};
            if ((int)heap.size() < k) {
                heap.push(item);
                continue;
            }
            const pair<int, string> root = heap.top();
            // Replace the root only when the newcomer outranks it:
            // higher count, or equal count and smaller word.
            if (item.first > root.first || (item.first == root.first && item.second < root.second)) {
                heap.pop();
                heap.push(item);
            }
        }
        vector<pair<int, string>> survivors;
        while (!heap.empty()) {
            survivors.push_back(heap.top());
            heap.pop();
        }
        // Survivors are exactly the top k by (higher count, then smaller
        // word); emit them in that order.
        sort(survivors.begin(), survivors.end(), [](const pair<int, string> &a, const pair<int, string> &b) {
            if (a.first != b.first)
                return a.first > b.first;
            return a.second < b.second;
        });
        vector<string> result;
        result.reserve(k);
        for (int i = 0; i < k && i < (int)survivors.size(); ++i) {
            result.push_back(survivors[i].second);
        }
        return result;
    }
};
