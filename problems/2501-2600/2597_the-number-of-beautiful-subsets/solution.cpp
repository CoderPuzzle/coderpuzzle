class Solution {
  public:
    int beautifulSubsets(std::vector<int> &nums, int k) {
        // Sort, then decide each element take-or-skip in index order.
        // Taking nums[i] is legal exactly when no earlier-taken value
        // equals nums[i] - k — the only conflict a sorted order can
        // create; a counter map tracks how often each taken value
        // occurs (duplicates never clash with each other since k >= 1).
        // Every take/skip leaf is one subset selection; drop the empty
        // one at the end. The answer is at most 2^18 - 1 = 262143.
        std::sort(nums.begin(), nums.end());
        return countFrom(nums, k, {}, 0) - 1;
    }

  private:
    int countFrom(const std::vector<int> &nums, int k, std::unordered_map<int, int> taken, size_t i) {
        if (i == nums.size()) {
            return 1;
        }
        int total = countFrom(nums, k, taken, i + 1);
        auto clash = taken.find(nums[i] - k);
        if (clash == taken.end() || clash->second == 0) {
            taken[nums[i]] += 1;
            total += countFrom(nums, k, taken, i + 1);
            taken[nums[i]] -= 1;
        }
        return total;
    }
};
