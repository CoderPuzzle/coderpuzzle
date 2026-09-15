class Solution {
  public:
    bool sequenceReconstruction(vector<int> &nums, vector<vector<int>> &sequences) {
        // Consecutive elements of a sequence pin an adjacency: every shortest
        // supersequence is a permutation of [1, n] keeping each such pair in
        // order, so nums is the unique one exactly when the pinned pairs chain
        // all of nums together in nums's own order.
        int n = (int)nums.size();
        vector<int> pos(n + 1);
        for (int i = 0; i < n; ++i) {
            pos[nums[i]] = i;
        }
        // covered[i] is set once some sequence places nums[i + 1] directly
        // after nums[i]; with n == 1 there is nothing to pin.
        vector<char> covered(n - 1, 0);
        for (const vector<int> &seq : sequences) {
            for (int x : seq) {
                // A value outside [1, n] cannot occur in nums at all, so nums
                // is not even a supersequence.
                if (x < 1 || x > n) {
                    return false;
                }
            }
            for (int j = 0; j + 1 < (int)seq.size(); ++j) {
                int u = pos[seq[j]], v = pos[seq[j + 1]];
                // A pair running backwards in nums means its sequence never
                // embeds in nums.
                if (u >= v) {
                    return false;
                }
                if (v == u + 1) {
                    covered[u] = 1;
                }
            }
        }
        // An unpinned adjacency could be flipped into another permutation of
        // the same length, so uniqueness needs every slot pinned.
        for (int pinned : covered) {
            if (!pinned) {
                return false;
            }
        }
        return true;
    }
};
