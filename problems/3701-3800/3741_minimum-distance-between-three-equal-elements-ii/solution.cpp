class Solution {
  public:
    int minimumDistance(vector<int> &nums) {
        // The three pairwise gaps of a good tuple telescope to twice the
        // span between its outermost indices, so the closest tuple is the
        // one whose outermost same-value indices are nearest. Every value
        // gets its own bucket of indices, filled in one left-to-right pass
        // so each bucket comes out sorted for free.
        int n = nums.size();
        vector<vector<int>> groups(n + 1);
        for (int index = 0; index < n; index++) {
            groups[nums[index]].push_back(index);
        }
        // Inside a sorted bucket no triple beats some consecutive window:
        // the two entries immediately following any entry sit no later than
        // the other two entries of any triple opened there, so their window
        // spans no more.
        int best = -1;
        for (const vector<int> &indices : groups) {
            for (int start = 0; start + 2 < (int)indices.size(); start++) {
                int span = indices[start + 2] - indices[start];
                if (best == -1 || span < best) {
                    best = span;
                }
            }
        }
        // The best span stays unset unless some value occurs at least three
        // times; otherwise no good tuple exists.
        return best == -1 ? -1 : 2 * best;
    }
};
