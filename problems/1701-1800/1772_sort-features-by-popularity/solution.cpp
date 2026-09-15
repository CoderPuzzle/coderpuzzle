class Solution {
  public:
    vector<string> sortFeatures(vector<string> &features, vector<string> &responses) {
        // A response contributes to a feature at most once: count each
        // distinct word of the response that names a feature.
        unordered_map<string, int> popularity;
        for (const auto &f : features) {
            popularity.emplace(f, 0);
        }
        for (const auto &response : responses) {
            unordered_set<string> seen;
            size_t start = 0;
            while (start <= response.size()) {
                size_t end = response.find(' ', start);
                if (end == string::npos) {
                    end = response.size();
                }
                seen.insert(response.substr(start, end - start));
                start = end + 1;
            }
            for (const auto &word : seen) {
                auto it = popularity.find(word);
                if (it != popularity.end()) {
                    ++it->second;
                }
            }
        }
        vector<int> order(features.size());
        iota(order.begin(), order.end(), 0);
        // Total order: higher popularity first, then the earlier original
        // index — the comparator fully orders every pair, so no sort
        // stability is relied on.
        sort(order.begin(), order.end(), [&](int a, int b) {
            int pa = popularity[features[a]];
            int pb = popularity[features[b]];
            if (pa != pb)
                return pa > pb;
            return a < b;
        });
        vector<string> result;
        result.reserve(features.size());
        for (int i : order) {
            result.push_back(features[i]);
        }
        return result;
    }
};
