class Solution {
  public:
    int climbStairs(int n) {
        // ways(i) obeys the Fibonacci recurrence: the last move onto step i
        // is a 1-step from i-1 or a 2-step from i-2, and the two groups are
        // disjoint and exhaustive, so ways(i) = ways(i-1) + ways(i-2).
        int prev = 1, curr = 1; // ways(0) = 1 (the empty climb), ways(1) = 1
        for (int i = 1; i < n; ++i) {
            int next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }
};
