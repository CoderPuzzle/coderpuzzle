class Solution {
  public:
    vector<string> subdomainVisits(vector<string> &cpdomains) {
        // One pass: each entry fans its count out over every dot-suffix of
        // its domain — the domain itself and each subdomain cut at a dot.
        unordered_map<string, int> counts;
        for (const auto &cpdomain : cpdomains) {
            size_t space = cpdomain.find(' ');
            int rep = stoi(cpdomain.substr(0, space));
            const string domain = cpdomain.substr(space + 1);
            size_t from = 0;
            while (true) {
                counts[domain.substr(from)] += rep;
                size_t dot = domain.find('.', from);
                if (dot == string::npos) {
                    break;
                }
                from = dot + 1;
            }
        }
        // Pinned output order: ascending lexicographic by domain name —
        // an explicit comparator, never hash-table order.
        vector<pair<string, int>> items(counts.begin(), counts.end());
        sort(items.begin(), items.end(),
             [](const pair<string, int> &a, const pair<string, int> &b) { return a.first < b.first; });
        vector<string> result;
        result.reserve(items.size());
        for (const auto &[domain, total] : items) {
            result.push_back(to_string(total) + " " + domain);
        }
        return result;
    }
};
