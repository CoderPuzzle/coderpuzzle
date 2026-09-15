class Solution {
  public:
    bool canChange(string start, string target) {
        int n = (int)start.size();
        // pieces cannot pass through each other, so their relative order is
        // invariant: the k-th non-blank of start must match the k-th of target
        vector<pair<int, char>> s, t;
        for (int i = 0; i < n; i++) {
            if (start[i] != '_')
                s.push_back({i, start[i]});
            if (target[i] != '_')
                t.push_back({i, target[i]});
        }
        // unequal piece counts can never be matched one-to-one
        if (s.size() != t.size())
            return false;
        for (size_t p = 0; p < s.size(); p++) {
            int i = s[p].first;
            char ci = s[p].second;
            int j = t[p].first;
            char cj = t[p].second;
            // equal counts but a different L/R sequence cannot align
            if (ci != cj)
                return false;
            // L slides only left: it must not need to move right (i >= j);
            // R slides only right: i <= j — and these checks are also
            // sufficient, so no moves ever need simulating
            if (ci == 'L' && i < j)
                return false;
            if (ci == 'R' && i > j)
                return false;
        }
        return true;
    }
};
