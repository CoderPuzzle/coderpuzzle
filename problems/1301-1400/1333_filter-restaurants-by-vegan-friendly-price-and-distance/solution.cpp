class Solution {
  public:
    vector<int> filterRestaurants(vector<vector<int>> &restaurants, int veganFriendly, int maxPrice, int maxDistance) {
        // Inclusive caps; the vegan filter only bites when it is 1. Survivors
        // sort by rating desc, then id desc.
        vector<vector<int>> kept;
        for (auto &entry : restaurants) {
            if ((veganFriendly == 0 || entry[2] == 1) && entry[3] <= maxPrice && entry[4] <= maxDistance) {
                kept.push_back(entry);
            }
        }
        sort(kept.begin(), kept.end(), [](const vector<int> &a, const vector<int> &b) {
            if (a[1] != b[1])
                return a[1] > b[1];
            return a[0] > b[0];
        });
        vector<int> out;
        out.reserve(kept.size());
        for (auto &entry : kept) {
            out.push_back(entry[0]);
        }
        return out;
    }
};
