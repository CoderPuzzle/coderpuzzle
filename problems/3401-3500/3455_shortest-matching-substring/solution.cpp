class Solution {
  public:
    int shortestMatchingSubstring(string s, string p) {
        size_t first = p.find('*');
        size_t second = p.find('*', first + 1);
        string a = p.substr(0, first);
        string b = p.substr(first + 1, second - first - 1);
        string c = p.substr(second + 1);
        vector<int> occA = a.empty() ? vector<int>() : findAll(s, a);
        vector<int> occB = b.empty() ? vector<int>() : findAll(s, b);
        vector<int> occC = c.empty() ? vector<int>() : findAll(s, c);

        // segs: {length, occurrences}
        vector<pair<int, vector<int>>> segs;
        if (!a.empty())
            segs.emplace_back((int)a.size(), std::move(occA));
        if (!b.empty())
            segs.emplace_back((int)b.size(), std::move(occB));
        if (!c.empty())
            segs.emplace_back((int)c.size(), std::move(occC));

        if (segs.empty())
            return 0;
        if (segs.size() == 1)
            return segs[0].second.empty() ? -1 : segs[0].first;
        if (segs.size() == 2) {
            int l1 = segs[0].first;
            const vector<int> &occ1 = segs[0].second;
            int l2 = segs[1].first;
            const vector<int> &occ2 = segs[1].second;
            int best = -1;
            for (int j : occ2) {
                int idx = (int)(upper_bound(occ1.begin(), occ1.end(), j - l1) - occ1.begin()) - 1;
                if (idx >= 0) {
                    int cand = j + l2 - occ1[idx];
                    if (best == -1 || cand < best)
                        best = cand;
                }
            }
            return best;
        }
        // three non-empty segments
        int l1 = segs[0].first;
        const vector<int> &occ1 = segs[0].second;
        int l2 = segs[1].first;
        const vector<int> &occ2 = segs[1].second;
        int l3 = segs[2].first;
        const vector<int> &occ3 = segs[2].second;
        vector<int> bestIForJ(occ2.size(), -1);
        for (size_t t = 0; t < occ2.size(); t++) {
            int j = occ2[t];
            int idx = (int)(upper_bound(occ1.begin(), occ1.end(), j - l1) - occ1.begin()) - 1;
            if (idx >= 0)
                bestIForJ[t] = occ1[idx];
        }
        int best = -1;
        for (int k : occ3) {
            int jIdx = (int)(upper_bound(occ2.begin(), occ2.end(), k - l2) - occ2.begin()) - 1;
            if (jIdx >= 0 && bestIForJ[jIdx] != -1) {
                int cand = k + l3 - bestIForJ[jIdx];
                if (best == -1 || cand < best)
                    best = cand;
            }
        }
        return best;
    }

  private:
    vector<int> findAll(const string &s, const string &pat) {
        vector<int> result;
        size_t start = 0;
        while (true) {
            size_t idx = s.find(pat, start);
            if (idx == string::npos)
                break;
            result.push_back((int)idx);
            start = idx + 1;
        }
        return result;
    }
};
