class Solution {
  public:
    long long maxTotal(vector<int> &value, vector<int> &limit) {
        // A limit-L element can only be taken while fewer than L elements
        // are active, and the moment the count reaches L the rest of its
        // group locks out forever — so each group contributes at most its
        // min(L, m) largest values. Sorting by value descending and capping
        // each group at L picks collects exactly those.
        int n = value.size();
        vector<pair<int, int>> items;
        items.reserve(n);
        for (int i = 0; i < n; ++i) {
            items.push_back({value[i], limit[i]});
        }
        sort(items.rbegin(), items.rend());
        vector<int> taken(n + 1, 0);
        long long total = 0;
        for (const auto &[v, l] : items) {
            if (taken[l] < l) {
                ++taken[l];
                total += v;
            }
        }
        return total;
    }
};
