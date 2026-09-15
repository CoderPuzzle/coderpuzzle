class Solution {
  public:
    vector<int> diStringMatch(string s) {
        // Two counters bracket the value range: `lo` is the smallest value
        // not yet placed, `hi` the largest. An 'I' is safest satisfied with
        // lo (everything still unused is larger), a 'D' with hi — the pinned
        // canonical construction.
        int n = s.size();
        int lo = 0, hi = n;
        vector<int> perm;
        perm.reserve(n + 1);
        for (int i = 0; i < n; ++i) {
            if (s[i] == 'I') {
                perm.push_back(lo++);
            } else {
                perm.push_back(hi--);
            }
        }
        // lo and hi have met; the single leftover value fills the last slot.
        perm.push_back(lo);
        return perm;
    }
};
