class Solution {
  public:
    int maxNumOfMarkedIndices(vector<int> &nums) {
        vector<int> a(nums);
        sort(a.begin(), a.end());
        int n = a.size();
        int i = 0;
        // Large partners must come from the upper half: with p pairs the
        // smalls are p elements of the lower part and the larges p of the
        // upper, so j starts at the midpoint.
        for (int j = (n + 1) / 2; j < n; j++) {
            // Match in sorted order (exchange argument): pairing the smallest
            // remaining small with the smallest qualifying large never costs
            // a match, and i only advances on a successful pair.
            if (2LL * a[i] <= (long long)a[j]) {
                i++;
            }
        }
        // i counts pairs; every pair marks two indices.
        return 2 * i;
    }
};
