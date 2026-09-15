class Solution {
  public:
    vector<int> numberOfAlternatingGroups(vector<int> &colors, vector<vector<int>> &queries) {
        // Edge j joins tile j and tile j + 1 circularly and is bad when its two
        // endpoints share a color. A size-k group starting at tile s spans the
        // k - 1 consecutive edges s..s+k-2, so counting size-k groups means
        // counting starting edges followed by k - 1 good edges. Keep the bad
        // edges in an ordered set and the multiset of good-edge runs between
        // neighboring bad edges in two Fenwick trees keyed by run length (one
        // counting runs, one summing lengths); a repaint toggles exactly two
        // edges, each splitting or merging a single run, and with no bad edge
        // left every one of the n starts works.
        int n = colors.size();
        vector<char> bad(n);
        set<int> bads;
        vector<int> fenCnt(n + 1, 0), fenSum(n + 1, 0);
        int cntAll = 0, sumAll = 0;
        auto cyc = [&](long long d) { return (int)(((d % n) + n) % n); };
        auto fenAdd = [&](vector<int> &fen, int length, int delta) {
            for (int i = length + 1; i <= n; i += i & (-i))
                fen[i] += delta;
        };
        auto fenPrefix = [&](vector<int> &fen, int length) {
            int total = 0;
            for (int i = length + 1; i > 0; i -= i & (-i))
                total += fen[i];
            return total;
        };
        auto runsUpdate = [&](int length, int delta) {
            if (length > 0) {
                fenAdd(fenCnt, length, delta);
                fenAdd(fenSum, length, delta * length);
                cntAll += delta;
                sumAll += delta * length;
            }
        };
        auto prevBad = [&](int e) {
            auto it = bads.lower_bound(e);
            return it == bads.begin() ? *bads.rbegin() : *prev(it);
        };
        auto nextBad = [&](int e) {
            auto it = bads.upper_bound(e);
            return it == bads.end() ? *bads.begin() : *it;
        };
        auto insertEdge = [&](int e) {
            if (!bads.empty()) {
                int p = prevBad(e), nx = nextBad(e);
                runsUpdate(cyc((long long)nx - p - 1), -1);
                runsUpdate(cyc((long long)e - p - 1), 1);
                runsUpdate(cyc((long long)nx - e - 1), 1);
            }
            bads.insert(e);
            if (bads.size() == 1)
                runsUpdate(n - 1, 1);
        };
        auto removeEdge = [&](int e) {
            bads.erase(e);
            if (!bads.empty()) {
                int p = prevBad(e), nx = nextBad(e);
                runsUpdate(cyc((long long)e - p - 1), -1);
                runsUpdate(cyc((long long)nx - e - 1), -1);
                runsUpdate(cyc((long long)nx - p - 1), 1);
            } else {
                runsUpdate(n - 1, -1);
            }
        };

        for (int j = 0; j < n; j++) {
            bad[j] = colors[j] == colors[(j + 1) % n];
            if (bad[j])
                insertEdge(j);
        }

        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &query : queries) {
            if (query[0] == 1) {
                if (bads.empty()) {
                    answer.push_back(n);
                    continue;
                }
                int need = query[1] - 1;
                int cntGe = cntAll - fenPrefix(fenCnt, need - 1);
                int sumGe = sumAll - fenPrefix(fenSum, need - 1);
                answer.push_back(sumGe - (need - 1) * cntGe);
            } else {
                int index = query[1], color = query[2];
                if (colors[index] == color)
                    continue;
                colors[index] = color;
                int touched[2] = {(index + n - 1) % n, index};
                for (int e : touched) {
                    bool isBad = colors[e] == colors[(e + 1) % n];
                    if (isBad == (bool)bad[e])
                        continue;
                    bad[e] = isBad;
                    if (isBad)
                        insertEdge(e);
                    else
                        removeEdge(e);
                }
            }
        }
        return answer;
    }
};
