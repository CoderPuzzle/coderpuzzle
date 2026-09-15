class Solution {
  public:
    int minSplitMerge(vector<int> &nums1, vector<int> &nums2) {
        // Every operation costs exactly one layer, so breadth-first search
        // from nums1 reaches nums2 along a shortest operation sequence; the
        // whole state space holds at most n! <= 720 arrays.
        if (nums1 == nums2) {
            return 0;
        }
        int n = nums1.size();
        set<vector<int>> seen;
        queue<vector<int>> q;
        seen.insert(nums1);
        q.push(nums1);
        int steps = 0;
        while (!q.empty()) {
            ++steps;
            for (int level = q.size(); level > 0; --level) {
                vector<int> state = q.front();
                q.pop();
                // Cut every subarray [l..r] (single elements included) and
                // paste it at every slot of the remainder.
                for (int l = 0; l < n; ++l) {
                    for (int r = l; r < n; ++r) {
                        vector<int> piece(state.begin() + l, state.begin() + r + 1);
                        vector<int> rest(state.begin(), state.begin() + l);
                        rest.insert(rest.end(), state.begin() + r + 1, state.end());
                        for (int i = 0; i <= (int)rest.size(); ++i) {
                            vector<int> nxt;
                            nxt.reserve(n);
                            nxt.insert(nxt.end(), rest.begin(), rest.begin() + i);
                            nxt.insert(nxt.end(), piece.begin(), piece.end());
                            nxt.insert(nxt.end(), rest.begin() + i, rest.end());
                            if (nxt == nums2) {
                                return steps;
                            }
                            if (seen.insert(nxt).second) {
                                q.push(nxt);
                            }
                        }
                    }
                }
            }
        }
        return -1; // unreachable: nums2 is guaranteed to be a permutation
    }
};
