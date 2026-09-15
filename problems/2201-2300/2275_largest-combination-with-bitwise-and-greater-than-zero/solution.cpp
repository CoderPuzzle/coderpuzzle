class Solution {
  public:
    int largestCombination(vector<int> &candidates) {
        array<int, 24> counts{};
        for (int value : candidates) {
            for (int bit = 0; bit < 24; ++bit) {
                if (value >> bit & 1) {
                    ++counts[bit];
                }
            }
        }
        return *max_element(counts.begin(), counts.end());
    }
};
