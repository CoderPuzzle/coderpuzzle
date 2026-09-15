class Solution {
  public:
    long long climbStairs(int n, vector<int> &costs) {
        // prev1/prev2/prev3 are the cheapest ways to stand on the three
        // steps below the current one. Step 0 is free; the steps below it
        // do not exist, so their sentinel costs price step 1 out of long
        // opening jumps.
        const long long INF = 1LL << 60;
        long long prev1 = 0, prev2 = INF, prev3 = INF;
        for (int j = 1; j <= n; j++) {
            long long land = costs[j - 1];
            // The final hop covered d steps for some d in 1..3, paying the
            // landing fee plus the squared jump length.
            long long cur = min({prev1 + land + 1, prev2 + land + 4, prev3 + land + 9});
            prev3 = prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
};
