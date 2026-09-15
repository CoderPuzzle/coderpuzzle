class Solution {
  public:
    int smallestAbsent(vector<int> &nums) {
        // A hash set turns "is candidate c present in nums?" into an O(1)
        // lookup, so the answer is found by walking upward from 1.
        unordered_set<int> present(nums.begin(), nums.end());
        long long total = 0;
        for (int value : nums) {
            total += value;
        }
        int n = (int)nums.size();
        // Skip candidates at or below the average: candidate > total/n is
        // tested as candidate * n > total, an exact integer comparison --
        // equality fails it, so an integral average excludes itself. The
        // walk starts at 1 because the answer must be positive. The sum is
        // accumulated in 64 bits even though it fits in 32 here.
        long long candidate = 1;
        while (candidate * n <= total) {
            ++candidate;
        }
        while (present.count((int)candidate)) {
            ++candidate;
        }
        return (int)candidate;
    }
};
