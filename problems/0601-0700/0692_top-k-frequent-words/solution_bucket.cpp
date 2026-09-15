class Solution {
  public:
    vector<string> topKFrequent(vector<string> &words, int k) {
        // One counting pass over the array.
        unordered_map<string, int> counts;
        for (const auto &w : words) {
            ++counts[w];
        }
        // Buckets indexed by frequency: a word with count c lands in
        // buckets[c], and no count can exceed n.
        int n = words.size();
        vector<vector<string>> buckets(n + 1);
        for (const auto &kv : counts) {
            buckets[kv.second].push_back(kv.first);
        }
        vector<string> result;
        result.reserve(k);
        // Walk frequencies from the highest possible down; within one
        // bucket sort words ascending, so ties break alphabetically —
        // and stop as soon as k words are in hand.
        for (int c = n; c >= 1 && (int)result.size() < k; c--) {
            vector<string> &bucket = buckets[c];
            if (bucket.empty())
                continue;
            sort(bucket.begin(), bucket.end());
            for (const auto &word : bucket) {
                if ((int)result.size() == k)
                    break;
                result.push_back(word);
            }
        }
        return result;
    }
};
