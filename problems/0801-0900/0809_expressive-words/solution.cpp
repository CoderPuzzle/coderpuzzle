class Solution {
  public:
    int expressiveWords(string s, vector<string> &words) {
        // Run-length encode s once: its letter spine is what every
        // stretchy word must reproduce, group by group.
        vector<pair<char, int>> sGroups;
        int i = 0;
        while (i < (int)s.size()) {
            int j = i;
            while (j < (int)s.size() && s[j] == s[i])
                ++j;
            sGroups.push_back({s[i], j - i});
            i = j;
        }
        int count = 0;
        for (const auto &w : words) {
            // Walk w's own groups against s's: same letters, same group
            // count, and per group either equal counts or an s-side
            // count of 3 or more strictly above the word's.
            bool ok = true;
            int gi = 0, k = 0;
            while (k < (int)w.size()) {
                int j = k;
                while (j < (int)w.size() && w[j] == w[k])
                    ++j;
                if (gi == (int)sGroups.size() || sGroups[gi].first != w[k]) {
                    ok = false;
                    break;
                }
                int sCount = sGroups[gi].second;
                int wCount = j - k;
                if (sCount != wCount && !(sCount >= 3 && sCount > wCount)) {
                    ok = false;
                    break;
                }
                ++gi;
                k = j;
            }
            // The walk must end in lockstep with s's spine.
            if (ok && gi == (int)sGroups.size())
                ++count;
        }
        return count;
    }
};
