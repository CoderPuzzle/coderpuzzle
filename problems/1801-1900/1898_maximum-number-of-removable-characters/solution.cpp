class Solution {
  public:
    int maximumRemovals(string s, string p, vector<int> &removable) {
        // Feasibility is monotone (fewer deletions only restore characters), so the
        // workable k form an interval starting at 0 — binary search its right end.
        int lo = 0, hi = (int)removable.size();
        while (lo < hi) {
            // Upper-mid form keeps the search converging toward the largest feasible k.
            int mid = (lo + hi + 1) / 2;
            if (stillSubsequence(s, p, removable, mid))
                lo = mid;
            else
                hi = mid - 1;
        }
        return lo;
    }

  private:
    // Classic greedy subsequence scan: skipping removed positions, match each
    // character of p at the earliest opportunity (optimal for containment).
    bool stillSubsequence(const string &s, const string &p, const vector<int> &removable, int k) {
        vector<char> removed(s.size(), false);
        for (int i = 0; i < k; ++i)
            removed[removable[i]] = true;
        int pi = 0;
        for (int i = 0; i < (int)s.size() && pi < (int)p.size(); ++i) {
            if (!removed[i] && s[i] == p[pi])
                pi++;
        }
        return pi == (int)p.size();
    }
};
