class Solution {
  public:
    vector<int> fullBloomFlowers(vector<vector<int>> &flowers, vector<int> &people) {
        int n = flowers.size();
        vector<int> starts, ends;
        starts.reserve(n);
        ends.reserve(n);
        for (auto &f : flowers) {
            starts.push_back(f[0]);
            ends.push_back(f[1]);
        }
        // The two sides can be sorted separately: a query never needs to know
        // which start belongs to which end, only the two one-sided counts.
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());
        vector<int> res;
        res.reserve(people.size());
        for (int t : people) {
            // Blooming at t: start <= t and end >= t. upper_bound counts
            // starts <= t (a flower starting exactly at t is blooming);
            // lower_bound counts ends < t, so a flower ending exactly at t is
            // still counted.
            int a = upper_bound(starts.begin(), starts.end(), t) - starts.begin();
            int b = lower_bound(ends.begin(), ends.end(), t) - ends.begin();
            res.push_back(a - b);
        }
        return res;
    }
};
