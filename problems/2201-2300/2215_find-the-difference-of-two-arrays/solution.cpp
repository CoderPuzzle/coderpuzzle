class Solution {
  public:
    vector<vector<int>> findDifference(vector<int> &nums1, vector<int> &nums2) {
        // Set membership answers "present in the other array" in O(1); the
        // surviving distinct values are emitted ascending for judging.
        unordered_set<int> set1(nums1.begin(), nums1.end());
        unordered_set<int> set2(nums2.begin(), nums2.end());
        return {distinctSorted(nums1, set2), distinctSorted(nums2, set1)};
    }

  private:
    vector<int> distinctSorted(vector<int> &source, unordered_set<int> &other) {
        vector<int> kept;
        for (int value : source) {
            if (!other.count(value)) {
                kept.push_back(value);
            }
        }
        sort(kept.begin(), kept.end());
        kept.erase(unique(kept.begin(), kept.end()), kept.end());
        return kept;
    }
};
