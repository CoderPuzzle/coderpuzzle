class Solution {
  public:
    long long countPrefixSuffixPairs(vector<string> &words) {
        // Trie over paired characters (first+last, second+second-last, ...).
        // Node counters stay below 10^5, but the total can reach ~5 * 10^9,
        // so the accumulator is a long long.
        unordered_map<int, int> edges;
        vector<int> counts;
        counts.push_back(0);
        long long total = 0;
        for (const string &word : words) {
            int size = word.size();
            int node = 0;
            for (int j = 0; j < size; ++j) {
                int key = node * 676 + (word[j] - 'a') * 26 + (word[size - 1 - j] - 'a');
                auto it = edges.find(key);
                int next;
                if (it == edges.end()) {
                    next = counts.size();
                    edges.emplace(key, next);
                    counts.push_back(0);
                } else {
                    next = it->second;
                }
                node = next;
                total += counts[node];
            }
            ++counts[node];
        }
        return total;
    }
};
