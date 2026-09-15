class Solution {
  public:
    vector<int> stableMountains(vector<int> &height, int threshold) {
        // Mountain i is stable exactly when its immediate predecessor is
        // strictly taller than the threshold; one left-to-right pass emits
        // the qualifying indices in ascending order.
        vector<int> stable;
        stable.reserve(height.size() - 1);
        for (size_t i = 1; i < height.size(); ++i) {
            if (height[i - 1] > threshold) {
                stable.push_back((int)i);
            }
        }
        return stable;
    }
};
