class Solution {
  public:
    int maximumSum(vector<int> &arr) {
        int n = arr.size();
        if (n == 1) {
            return arr[0];
        }
        // noDel: max subarray sum ending at i with no deletion
        // oneDel: max subarray sum ending at i with exactly one deletion
        long long noDel = arr[0];
        long long oneDel = LLONG_MIN / 2;
        long long best = arr[0];
        for (int i = 1; i < n; i++) {
            // two origins: deletion already used earlier and the subarray
            // extends through arr[i], or the deletion happens exactly now
            // (drop arr[i] from the previous noDel) — oneDel must be
            // computed first so it reads the pre-update noDel
            oneDel = max(oneDel + arr[i], noDel);
            noDel = max(noDel + arr[i], (long long)arr[i]);
            best = max({best, noDel, oneDel});
        }
        return (int)best;
    }
};
