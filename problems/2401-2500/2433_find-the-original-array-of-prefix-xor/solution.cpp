class Solution {
  public:
    vector<int> findArray(vector<int> &pref) {
        // arr[i] = pref[i] ^ pref[i-1] for every i (arr[0] = pref[0]), and
        // xor is its own inverse, so the original array falls out of one
        // linear difference pass. Written into a fresh output so the
        // caller's pref is never disturbed.
        vector<int> arr(pref.size());
        arr[0] = pref[0];
        for (int i = 1; i < (int)pref.size(); ++i)
            arr[i] = pref[i] ^ pref[i - 1];
        return arr;
    }
};
