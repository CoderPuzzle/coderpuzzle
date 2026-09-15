class Solution {
  public:
    int largestValsFromLabels(vector<int> &values, vector<int> &labels, int numWanted, int useLimit) {
        // Greedy: sort items by value descending and take each one while
        // both the per-label cap and the total count allow it.
        vector<pair<int, int>> items;
        for (int i = 0; i < (int)values.size(); ++i) {
            items.push_back({values[i], labels[i]});
        }
        sort(items.begin(), items.end(), [](const auto &a, const auto &b) { return a.first > b.first; });
        unordered_map<int, int> used;
        int total = 0;
        int taken = 0;
        for (auto &[value, label] : items) {
            if (taken == numWanted)
                break;
            if (used[label] == useLimit)
                continue;
            used[label]++;
            total += value;
            taken++;
        }
        return total;
    }
};
