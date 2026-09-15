class Solution {
  public:
    vector<int> movesToStamp(string stamp, string target) {
        // Work backwards from target, where stamping forwards becomes erasing:
        // a window is erasable once every character in it either equals its
        // stamp counterpart or is already '?', because the last stamp to
        // cover a position always leaves the stamp's own letter there. Each
        // round takes the leftmost erasable window that still contains a
        // letter — erasing it can never block the remaining windows, since
        // turning letters into '?' only widens what matches — and blanks it.
        // A round that finds nothing while letters remain proves the target
        // unreachable; reversing the recorded indices yields the stamping
        // order.
        int m = (int)stamp.size();
        int n = (int)target.size();
        vector<char> s(target.begin(), target.end());
        int remaining = n;
        vector<int> recorded;
        while (remaining > 0) {
            int found = -1;
            for (int i = 0; i + m <= n; ++i) {
                bool ok = true;
                bool progress = false;
                for (int j = 0; j < m; ++j) {
                    char c = s[i + j];
                    if (c == '?') {
                        continue;
                    }
                    if (c != stamp[j]) {
                        ok = false;
                        break;
                    }
                    progress = true;
                }
                if (ok && progress) {
                    found = i;
                    break;
                }
            }
            if (found < 0) {
                return {};
            }
            for (int j = 0; j < m; ++j) {
                if (s[found + j] != '?') {
                    s[found + j] = '?';
                    --remaining;
                }
            }
            recorded.push_back(found);
        }
        reverse(recorded.begin(), recorded.end());
        return recorded;
    }
};
