class Solution {
  public:
    int maxPossibleScore(vector<int> &start, int d) {
        vector<long long> arr(start.begin(), start.end());
        sort(arr.begin(), arr.end());
        int n = (int)arr.size();
        long long dd = d;

        auto feasible = [&](long long x) {
            long long last = arr[0];
            for (int i = 1; i < n; i++) {
                long long chosen = max(arr[i], last + x);
                if (chosen > arr[i] + dd) {
                    return false;
                }
                last = chosen;
            }
            return true;
        };

        long long lo = 0;
        long long hi = arr[n - 1] + dd - arr[0] + 1; // hi is infeasible
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (feasible(mid)) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return (int)(lo - 1);
    }
};
