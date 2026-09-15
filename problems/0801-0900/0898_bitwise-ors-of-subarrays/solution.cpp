class Solution {
  public:
    int subarrayBitwiseORs(vector<int> &arr) {
        unordered_set<int> seen;
        // current: distinct OR values of subarrays ending at this index.
        unordered_set<int> current;
        for (int x : arr) {
            // Every subarray ending here is [x] alone or an old suffix OR
            // extended by x; OR never clears bits, so current stays small
            // (at most ~b+1 values for b-bit numbers).
            unordered_set<int> nxt;
            for (int y : current) {
                nxt.insert(x | y);
            }
            nxt.insert(x);
            current = move(nxt);
            seen.insert(current.begin(), current.end());
        }
        return (int)seen.size();
    }
};
