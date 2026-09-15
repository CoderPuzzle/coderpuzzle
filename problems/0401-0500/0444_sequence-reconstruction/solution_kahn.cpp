class Solution {
  public:
    bool sequenceReconstruction(vector<int> &nums, vector<vector<int>> &sequences) {
        // Read the sequences as a precedence graph: each consecutive pair pins
        // u before v, and the shortest supersequences are exactly the
        // permutations of [1, n] respecting every pinned pair. Kahn's algorithm
        // peels the graph's sources in order; the order is forced exactly when
        // there is never more than one source to pick from.
        int n = (int)nums.size();
        for (const vector<int> &seq : sequences) {
            for (int x : seq) {
                // A value outside [1, n] cannot occur in nums at all, so nums
                // is not even a supersequence.
                if (x < 1 || x > n) {
                    return false;
                }
            }
        }
        vector<vector<int>> successors(n + 1);
        vector<int> unpinned(n + 1, 0);
        for (const vector<int> &seq : sequences) {
            for (int j = 0; j + 1 < (int)seq.size(); ++j) {
                int u = seq[j], v = seq[j + 1];
                // A repeated pair only pads v's count; every copy is discharged
                // together when u is picked, so multiplicity is harmless. A
                // pair pinned to one value never discharges and reads as a loop.
                successors[u].push_back(v);
                ++unpinned[v];
            }
        }
        // The free values are the ones with no unpinned predecessor left: two
        // at once could each come next, none means the pairs loop.
        queue<int> free;
        for (int x = 1; x <= n; ++x) {
            if (unpinned[x] == 0) {
                free.push(x);
            }
        }
        for (int want : nums) {
            if (free.size() != 1) {
                return false;
            }
            int u = free.front();
            free.pop();
            // The forced next value must be nums's own next value.
            if (u != want) {
                return false;
            }
            for (int v : successors[u]) {
                if (--unpinned[v] == 0) {
                    free.push(v);
                }
            }
        }
        return true;
    }
};
