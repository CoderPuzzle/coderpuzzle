class Solution {
  public:
    int minimumCost(int m, int n, vector<int> &horizontalCut, vector<int> &verticalCut) {
        // A cut costs its base price times the pieces it crosses: one more
        // for every opposite-direction cut already made. An exchange argument
        // (swapping adjacent opposite cuts never helps unless the pricier one
        // goes first) makes "expensive cuts early" the optimal schedule.
        vector<int> hcuts(horizontalCut), vcuts(verticalCut);
        sort(hcuts.rbegin(), hcuts.rend());
        sort(vcuts.rbegin(), vcuts.rend());
        size_t i = 0, j = 0;
        long long hMade = 0, vMade = 0;
        long long total = 0;
        // Two-pointer merge: always take the head with the larger base cost,
        // while its multiplier (opposite cuts made + 1) is still small.
        while (i < hcuts.size() && j < vcuts.size()) {
            // Ties (>=) may go to the horizontal head: equal base costs are
            // interchangeable in the exchange argument.
            if (hcuts[i] >= vcuts[j]) {
                total += (long long)hcuts[i] * (vMade + 1);
                i++;
                hMade++;
            } else {
                total += (long long)vcuts[j] * (hMade + 1);
                j++;
                vMade++;
            }
        }
        // One direction is drained, so the other's multiplier is now fixed.
        while (i < hcuts.size()) {
            total += (long long)hcuts[i] * (vMade + 1);
            i++;
        }
        while (j < vcuts.size()) {
            total += (long long)vcuts[j] * (hMade + 1);
            j++;
        }
        return (int)total;
    }
};
