class Solution {
  public:
    int findLUSlength(vector<string> &strs) {
        // A string can only win as itself: if any other string contains it as
        // a subsequence, every subsequence it could offer is common to both,
        // and equal duplicates contain each other, so both are disqualified.
        int best = -1;
        for (int i = 0; i < (int)strs.size(); ++i) {
            bool contained = false;
            for (int j = 0; j < (int)strs.size() && !contained; ++j) {
                if (j == i)
                    continue;
                // Two-pointer scan: walk strs[j] once, advancing in strs[i]
                // whenever the next character matches; containment holds iff
                // all of strs[i] was consumed.
                int at = 0;
                for (int k = 0; k < (int)strs[j].size() && at < (int)strs[i].size(); ++k) {
                    if (strs[i][at] == strs[j][k])
                        ++at;
                }
                contained = at == (int)strs[i].size();
            }
            if (!contained)
                best = max(best, (int)strs[i].size());
        }
        return best;
    }
};
