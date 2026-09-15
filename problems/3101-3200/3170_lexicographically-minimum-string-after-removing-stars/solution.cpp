class Solution {
  public:
    string clearStars(string s) {
        // Each '*' removes the newest surviving copy of the smallest letter
        // seen so far; deleting anything larger, or an older copy of that
        // letter, can only leave a bigger remainder behind.
        array<vector<int>, 26> slots;
        vector<bool> dropped(s.size(), false);
        for (int i = 0; i < (int)s.size(); ++i) {
            if (s[i] == '*') {
                dropped[i] = true;
                for (int c = 0; c < 26; ++c) {
                    if (!slots[c].empty()) {
                        dropped[slots[c].back()] = true;
                        slots[c].pop_back();
                        break;
                    }
                }
            } else {
                slots[s[i] - 'a'].push_back(i);
            }
        }
        string kept;
        for (int i = 0; i < (int)s.size(); ++i) {
            if (!dropped[i]) {
                kept.push_back(s[i]);
            }
        }
        return kept;
    }
};
