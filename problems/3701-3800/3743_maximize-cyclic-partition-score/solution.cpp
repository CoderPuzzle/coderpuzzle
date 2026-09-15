class Solution {
  public:
    long long maximumScore(vector<int> &nums, int k) {
        // Each subarray contributes a +max and a -min mark, so at most
        // min(k, n // 2) opposite pairs exist; a pair's credit is its plus
        // mark minus its minus mark -- exactly one subarray's range.
        int n = nums.size(), p = min<long long>(k, n / 2);
        const long long NEG = LLONG_MIN / 4;
        int size = p + 1;
        auto fresh = [&]() { return vector<long long>(size, NEG); };
        // Close a pair: the count grows by one.
        auto shiftAdd = [&](const vector<long long> &s, long long d) {
            vector<long long> out(size, NEG);
            for (int i = 1; i < size; ++i)
                if (s[i - 1] > NEG)
                    out[i] = s[i - 1] + d;
            return out;
        };
        auto bump = [&](vector<long long> s, long long d) {
            for (auto &v : s)
                if (v > NEG)
                    v += d;
            return s;
        };
        auto merge = [](vector<long long> a, const vector<long long> &b) {
            for (int i = 0; i < (int)a.size(); ++i)
                a[i] = max(a[i], b[i]);
            return a;
        };

        // Phase 0: closed[j] = j pairs done; op/om = one open pair started
        // with a +/- still owing its opposite sign.
        vector<long long> closed = fresh(), op = fresh(), om = fresh();
        closed[0] = 0;
        // Phase 1: wp/wm = the seam pair open, started +/-; wXY = seam X and
        // an open middle pair Y; fz = the seam pair has closed.
        vector<long long> wp = fresh(), wm = fresh(), wpp = fresh(), wpm = fresh(), wmp = fresh(), wmm = fresh(),
                          fz = fresh();

        for (int a : nums) {
            long long pristine = closed[0];

            vector<long long> nOp = merge(op, bump(closed, a));
            vector<long long> nOm = merge(om, bump(closed, -(long long)a));
            vector<long long> nClosed = merge(merge(closed, shiftAdd(op, -a)), shiftAdd(om, a));

            vector<long long> nWp = wp, nWm = wm;
            nWp[0] = max(nWp[0], pristine + a); // seam opens at the first mark
            nWm[0] = max(nWm[0], pristine - a);
            vector<long long> nWpp = merge(wpp, bump(wp, a));
            vector<long long> nWpm = merge(wpm, bump(wp, -a));
            vector<long long> nWmp = merge(wmp, bump(wm, a));
            vector<long long> nWmm = merge(wmm, bump(wm, -a));
            nWp = merge(nWp, shiftAdd(wpp, -a));
            nWp = merge(nWp, shiftAdd(wpm, a));
            nWm = merge(nWm, shiftAdd(wmp, -a));
            nWm = merge(nWm, shiftAdd(wmm, a));
            vector<long long> nFz = merge(merge(fz, shiftAdd(wp, -a)), shiftAdd(wm, a));

            closed = nClosed;
            op = nOp;
            om = nOm;
            wp = nWp;
            wm = nWm;
            wpp = nWpp;
            wpm = nWpm;
            wmp = nWmp;
            wmm = nWmm;
            fz = nFz;
        }

        long long best = 0;
        for (int i = 0; i < size; ++i)
            best = max(best, max(closed[i], fz[i]));
        return best;
    }
};
