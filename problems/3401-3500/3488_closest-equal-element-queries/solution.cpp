class Solution {
  public:
    // Group indices by value; each occurrence list is sorted. Per query,
    // binary-search the list and take the nearer of the two circular
    // neighbors.
    vector<int> solveQueries(vector<int> &nums, vector<int> &queries) {
        unordered_map<int, vector<int>> pos;
        for (int i = 0; i < (int)nums.size(); i++) {
            pos[nums[i]].push_back(i);
        }
        int n = nums.size();
        vector<int> ans;
        ans.reserve(queries.size());
        for (int q : queries) {
            vector<int> &p = pos[nums[q]];
            if (p.size() == 1) {
                ans.push_back(-1);
                continue;
            }
            int k = lower_bound(p.begin(), p.end(), q) - p.begin();
            int prev = k > 0 ? p[k - 1] : p.back();
            int nxt = k + 1 < (int)p.size() ? p[k + 1] : p[0];
            int dprev = ((q - prev) % n + n) % n;
            int dnxt = ((nxt - q) % n + n) % n;
            ans.push_back(min(dprev, dnxt));
        }
        return ans;
    }
};
