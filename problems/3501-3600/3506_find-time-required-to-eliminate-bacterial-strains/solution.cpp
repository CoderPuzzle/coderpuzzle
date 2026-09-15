class Solution {
  public:
    // The splitting process is a full binary tree: a leaf at depth d is a
    // WBC that starts working at d * splitTime. Deadline T is reachable iff
    // strain i can sit on a leaf of depth d <= (T - timeReq[i]) /
    // splitTime, and legal leaf-depth multisets are exactly the
    // Kraft-legal ones (sum 2^-d <= 1) -- minimized by taking every strain
    // at its full depth bound. Binary search the minimal T. Deadlines
    // reach ~1e14, so all bounds arithmetic is long long.
    long long minEliminationTime(vector<int> &timeReq, int splitTime) {
        int n = timeReq.size();
        int mx = *max_element(timeReq.begin(), timeReq.end());
        long long lo = (long long)mx + splitTime;
        long long hi = (long long)mx + (long long)(n - 1) * splitTime;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            int slots = 0;
            int deep = 0;
            bool ok = true;
            for (int t : timeReq) {
                long long d = (mid - t) / splitTime;
                if (d < 1) {
                    ok = false;
                    break;
                }
                if (d > 30) {
                    // bounds past depth 30 fit together in less than one
                    // 2^-30 unit of slack (n < 2^17 strains), so count all
                    // of them as a single unit
                    deep = 1;
                } else {
                    slots += 1 << (30 - (int)d);
                    if (slots > 1 << 30) {
                        ok = false;
                        break;
                    }
                }
            }
            if (ok && slots + deep <= (1 << 30)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
};
