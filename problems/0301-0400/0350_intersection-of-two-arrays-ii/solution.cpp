class Solution {
  public:
    vector<int> intersect(vector<int> &nums1, vector<int> &nums2) {
        // Count how many times each value occurs in nums1, then walk nums2:
        // a value can join the result at most min(count1, count2) times,
        // which the per-value counter enforces by falling to zero.
        unordered_map<int, int> counts;
        for (int value : nums1) {
            ++counts[value];
        }
        vector<int> picked;
        for (int value : nums2) {
            auto found = counts.find(value);
            if (found != counts.end() && found->second > 0) {
                --found->second;
                picked.push_back(value);
            }
        }
        // The judge compares arrays exactly, so pin the any-order freedom
        // to ascending sorted order before returning.
        sort(picked.begin(), picked.end());
        return picked;
    }
};
