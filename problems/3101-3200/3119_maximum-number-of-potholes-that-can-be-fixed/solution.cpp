class Solution {
  public:
    int maxPotholes(string road, int budget) {
        // Whole long runs are cheapest per pothole (L / (L + 1) grows with
        // L), so take longest runs first; when a full run no longer fits
        // only one partial purchase remains, worth budget - 1 potholes.
        vector<int> lengths;
        for (int i = 0; i < static_cast<int>(road.size()); ++i) {
            if (road[i] == 'x') {
                int start = i;
                while (i + 1 < static_cast<int>(road.size()) && road[i + 1] == 'x') {
                    ++i;
                }
                lengths.push_back(i - start + 1);
            }
        }
        sort(lengths.begin(), lengths.end(), greater<int>());
        int fixed = 0;
        for (int length : lengths) {
            if (budget >= length + 1) {
                budget -= length + 1;
                fixed += length;
            } else {
                fixed += max(0, budget - 1);
                break;
            }
        }
        return fixed;
    }
};
