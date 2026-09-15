class Solution {
  public:
    vector<int> minCosts(vector<int> &cost) {
        // Reaching position i costs no more than the cheapest swap among
        // people 0..i: swap into the cheapest position, then every later
        // position (being behind you) is free.
        vector<int> ans;
        int best = cost[0];
        for (int value : cost) {
            if (value < best) {
                best = value;
            }
            ans.push_back(best);
        }
        return ans;
    }
};
