class Solution {
  public:
    vector<vector<int>> minimumAbsDifference(vector<int> &arr) {
        vector<int> sorted_arr = arr;
        sort(sorted_arr.begin(), sorted_arr.end());
        vector<vector<int>> pairs;
        int best = INT_MAX;
        for (size_t i = 0; i + 1 < sorted_arr.size(); i++) {
            int gap = sorted_arr[i + 1] - sorted_arr[i];
            if (gap < best) {
                // A strictly closer neighbour pair retires everything
                // collected against the old minimum.
                best = gap;
                pairs.clear();
            }
            if (gap == best) {
                pairs.push_back({sorted_arr[i], sorted_arr[i + 1]});
            }
        }
        return pairs;
    }
};
