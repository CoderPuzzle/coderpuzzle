class Solution {
  public:
    vector<int> findIntersectionValues(vector<int> &nums1, vector<int> &nums2) {
        // answer1 counts indices whose value exists anywhere in the other
        // array; existence, not multiplicity, is what matters, so the only
        // state needed is each array's set of distinct values.
        unordered_set<int> set1(nums1.begin(), nums1.end());
        unordered_set<int> set2(nums2.begin(), nums2.end());
        int answer1 = 0;
        for (int x : nums1) {
            if (set2.count(x))
                ++answer1;
        }
        int answer2 = 0;
        for (int y : nums2) {
            if (set1.count(y))
                ++answer2;
        }
        return {answer1, answer2};
    }
};
