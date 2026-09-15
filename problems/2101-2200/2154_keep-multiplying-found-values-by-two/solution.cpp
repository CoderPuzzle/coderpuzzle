class Solution {
  public:
    int findFinalValue(vector<int> &nums, int original) {
        // One O(1) hash-set lookup per doubling step replaces a fresh scan
        // of nums each time; values stay <= 2048 (double the 1000 cap), so
        // no type ever comes close to overflowing.
        unordered_set<int> seen(nums.begin(), nums.end());
        while (seen.count(original)) {
            original *= 2;
        }
        return original;
    }
};
