class Solution {
  public:
    vector<string> sortPeople(vector<string> &names, vector<int> &heights) {
        // Sort indices by descending height; heights are distinct, so the
        // comparator fully orders every pair and no stability is relied on.
        vector<int> order(names.size());
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) { return heights[a] > heights[b]; });
        vector<string> result;
        result.reserve(names.size());
        for (int i : order) {
            result.push_back(names[i]);
        }
        return result;
    }
};
