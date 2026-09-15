class Solution {
  public:
    vector<int> findBuildings(vector<int> &heights) {
        // A building sees the ocean iff it strictly exceeds the max of
        // everything to its right; sweep inland carrying that max.
        vector<int> out;
        int tallest = 0;
        for (int i = (int)heights.size() - 1; i >= 0; i--) {
            if (heights[i] > tallest) {
                out.push_back(i);
                tallest = heights[i];
            }
        }
        reverse(out.begin(), out.end());
        return out;
    }
};
