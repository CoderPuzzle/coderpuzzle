class Solution {
  public:
    vector<string> maxNumOfSubstrings(string s) {
        int n = (int)s.size();
        vector<int> first(26, -1), last(26, -1);
        for (int i = 0; i < n; ++i) {
            int c = s[i] - 'a';
            if (first[c] == -1)
                first[c] = i;
            last[c] = i;
        }

        // Anchor a candidate at every position that is the first occurrence
        // of its character, then push `end` out to cover every character
        // met along the way. The expansion is a fixed point: it stops the
        // moment nothing inside [start, end] demands more room.
        vector<pair<int, int>> candidates;
        for (int i = 0; i < n; ++i) {
            int c0 = s[i] - 'a';
            if (first[c0] != i)
                continue;
            int start = i, end = last[c0];
            bool valid = true;
            for (int j = start; j <= end; ++j) {
                int c = s[j] - 'a';
                if (first[c] < start) {
                    // This character escapes to the left of the anchor, so
                    // no substring starting at `i` can ever be valid.
                    valid = false;
                    break;
                }
                end = max(end, last[c]);
            }
            if (valid)
                candidates.push_back({start, end});
        }

        // Classic activity-selection greedy: earliest-ending candidate
        // first, ties broken by length so a shorter, nested candidate is
        // preferred over the longer one that contains it.
        sort(candidates.begin(), candidates.end(), [](const pair<int, int> &a, const pair<int, int> &b) {
            if (a.second != b.second)
                return a.second < b.second;
            return (a.second - a.first) < (b.second - b.first);
        });

        vector<string> result;
        int prevEnd = -1;
        for (auto &range : candidates) {
            if (range.first > prevEnd) {
                result.push_back(s.substr(range.first, range.second - range.first + 1));
                prevEnd = range.second;
            }
        }
        return result;
    }
};
