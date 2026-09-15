class Solution {
  public:
    int arrayNesting(vector<int> &nums) {
        // A permutation makes i -> nums[i] a graph where every node has
        // exactly one successor and one predecessor, so the array splits
        // into disjoint cycles; s[k] is exactly the cycle containing k, and
        // every member of that cycle generates the same-length set.
        vector<char> seen(nums.size(), 0);
        int longest = 0;
        for (int start = 0; start < static_cast<int>(nums.size()); ++start) {
            if (seen[start]) {
                continue;
            }
            int length = 0;
            int index = start;
            while (!seen[index]) {
                seen[index] = 1;
                index = nums[index];
                ++length;
            }
            longest = max(longest, length);
        }
        return longest;
    }
};
