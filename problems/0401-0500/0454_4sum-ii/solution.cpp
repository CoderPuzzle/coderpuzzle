class Solution {
  public:
    int fourSumCount(vector<int> &nums1, vector<int> &nums2, vector<int> &nums3, vector<int> &nums4) {
        // Meet in the middle: a+b+c+d = 0 iff a+b = -(c+d), so index the
        // first two arrays' pair sums with multiplicities (not a set).
        unordered_map<int, int> sums;
        sums.reserve(nums1.size() * nums2.size() * 2);
        for (int a : nums1) {
            for (int b : nums2) {
                sums[a + b]++;
            }
        }
        int total = 0;
        // Each (c,d) pair adds the number of (a,b) pairs summing to its
        // negation; every zero tuple is counted once via its unique split.
        for (int c : nums3) {
            for (int d : nums4) {
                auto it = sums.find(-(c + d));
                if (it != sums.end())
                    total += it->second;
            }
        }
        return total;
    }
};
