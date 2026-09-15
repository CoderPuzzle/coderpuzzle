class Solution {
  public:
    int getSum(vector<int> &nums) {
        // Per-value chain-sum DP over four hash maps keyed by value. For
        // each direction, incCnt/decCnt count the chains seen so far that
        // end at an element of a value and incSum/decSum carry their total
        // element-sum; buckets accumulate across duplicate occurrences, so
        // element x extends every earlier chain ending at x-1 (or x+1) —
        // subsequence semantics, not substring. New chains ending here have
        // count cnt + 1 (the singleton [x]) and sum sum + cnt * x + x; the
        // singleton lives in both directions but is counted once, so the
        // step contributes incSum' + decSum' - x. Reduced mod 10^9 + 7 every
        // update: stored values < 10^9 + 7, widest intermediate is
        // cnt * x + sum < ~1.1 * 10^14, within long long.
        constexpr long long kMod = 1000000007LL;
        unordered_map<long long, long long> incCnt, incSum, decCnt, decSum;
        long long total = 0;
        for (int x : nums) {
            long long ci = 0, si = 0, cd = 0, sd = 0;
            auto itIc = incCnt.find(x - 1);
            if (itIc != incCnt.end())
                ci = itIc->second;
            auto itIs = incSum.find(x - 1);
            if (itIs != incSum.end())
                si = itIs->second;
            auto itDc = decCnt.find(x + 1);
            if (itDc != decCnt.end())
                cd = itDc->second;
            auto itDs = decSum.find(x + 1);
            if (itDs != decSum.end())
                sd = itDs->second;
            long long ni = (ci + 1) % kMod;
            long long nsi = (si + ni * x) % kMod;
            long long nd = (cd + 1) % kMod;
            long long nsd = (sd + nd * x) % kMod;
            total = ((total + nsi + nsd - x) % kMod + kMod) % kMod;
            incCnt[x] = (incCnt[x] + ni) % kMod;
            incSum[x] = (incSum[x] + nsi) % kMod;
            decCnt[x] = (decCnt[x] + nd) % kMod;
            decSum[x] = (decSum[x] + nsd) % kMod;
        }
        return static_cast<int>(total);
    }
};
