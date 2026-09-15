class Solution {
  public:
    bool maxSubstringLength(string s, int k) {
        int n = s.size();
        array<int, 26> first, last;
        first.fill(-1);
        for (int i = 0; i < n; ++i) {
            int c = s[i] - 'a';
            if (first[c] == -1)
                first[c] = i;
            last[c] = i;
        }
        vector<pair<int, int>> intervals;
        // Every special substring starts at the first occurrence of its
        // first letter — any earlier repeat would sit outside it — so at
        // most 26 candidate starts exist.
        for (int c = 0; c < 26; ++c) {
            if (first[c] == -1)
                continue;
            int a = first[c];
            // Grow the window right until it covers every occurrence of
            // every character inside it; a character leaking left of the
            // start invalidates this start entirely.
            int far = last[c];
            bool ok = true;
            for (int j = a; j <= far; ++j) {
                int x = s[j] - 'a';
                if (first[x] < a) {
                    ok = false;
                    break;
                }
                far = max(far, last[x]);
            }
            // The whole string itself is not a valid selection.
            if (ok && (a > 0 || far < n - 1))
                intervals.push_back({a, far});
        }
        auto byEnd = [](const pair<int, int> &u, const pair<int, int> &v) { return u.second < v.second; };
        sort(intervals.begin(), intervals.end(), byEnd);
        // Classic activity selection: taking earliest ends leaves the most
        // room for further disjoint picks.
        int count = 0;
        int end = -1;
        for (auto &[a, b] : intervals) {
            if (a > end) {
                ++count;
                end = b;
            }
        }
        return count >= k;
    }
};
