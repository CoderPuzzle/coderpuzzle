class Solution {
  public:
    int divisibleTripletCount(vector<int> &nums, int d) {
        // A triplet sum is divisible by d exactly when a middle element's
        // remainder completes the outer two: fix the left index L, sweep R
        // forward keeping remainder counts of the elements strictly between
        // them, and each lookup of the needed remainder counts every such
        // middle at once. Two-element sums exceed int, so the remainder
        // arithmetic runs in long long.
        int count = 0;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            unordered_map<int, int> between;
            for (int j = i + 1; j < n; ++j) {
                int rem = (int)(((long long)nums[i] + nums[j]) % d);
                int need = (d - rem) % d;
                auto it = between.find(need);
                if (it != between.end()) {
                    count += it->second;
                }
                ++between[(int)(((long long)nums[j]) % d)];
            }
        }
        return count;
    }
};
