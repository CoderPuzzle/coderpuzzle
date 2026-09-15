class Solution {
  public:
    long long bowlSubarrays(vector<int> &nums) {
        // A bowl is pinned by the maximum sitting strictly between its
        // rims: that element needs a strictly greater neighbour on both
        // sides, and those nearest greater elements are exactly the two
        // rims. Sweep left to right with a decreasing stack — when a value
        // pops an entry, it is that entry's next greater element and what
        // remains beneath names its previous greater one. The pop is a
        // bowl unless the stack emptied, i.e. no greater element on the
        // left; entries never popped never meet a greater element at all.
        long long count = 0;
        vector<int> stack;
        for (int x : nums) {
            while (!stack.empty() && stack.back() < x) {
                stack.pop_back();
                if (!stack.empty()) {
                    ++count;
                }
            }
            stack.push_back(x);
        }
        return count;
    }
};
