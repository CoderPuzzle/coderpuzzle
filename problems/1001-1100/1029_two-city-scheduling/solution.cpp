class Solution {
  public:
    int twoCitySchedCost(vector<vector<int>> &costs) {
        // Switching person i from B to A changes the total by a_i - b_i alone,
        // so the cheapest plan applies the n smallest differences.
        vector<vector<int>> ordered(costs);
        sort(ordered.begin(), ordered.end(),
             [](const vector<int> &a, const vector<int> &b) { return a[0] - a[1] < b[0] - b[1]; });
        // First half (most negative differences) flies A, rest fly B — the
        // split satisfies the half/half count structurally.
        int n = (int)ordered.size() / 2;
        int total = 0;
        for (int i = 0; i < (int)ordered.size(); i++) {
            total += i < n ? ordered[i][0] : ordered[i][1];
        }
        return total;
    }
};
