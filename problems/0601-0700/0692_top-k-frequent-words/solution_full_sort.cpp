class Solution {
  public:
    vector<string> topKFrequent(vector<string> &words, int k) {
        // One counting pass over the array.
        unordered_map<string, int> counts;
        for (const auto &w : words) {
            ++counts[w];
        }
        vector<pair<int, string>> ranked;
        ranked.reserve(counts.size());
        for (const auto &kv : counts) {
            ranked.push_back({kv.second, kv.first});
        }
        // Sort every unique word under the statement's total order — count
        // descending, then word ascending — and keep the first k.
        sort(ranked.begin(), ranked.end(), [](const pair<int, string> &a, const pair<int, string> &b) {
            if (a.first != b.first)
                return a.first > b.first;
            return a.second < b.second;
        });
        vector<string> result;
        result.reserve(k);
        for (int i = 0; i < k && i < (int)ranked.size(); ++i) {
            result.push_back(ranked[i].second);
        }
        return result;
    }
};
