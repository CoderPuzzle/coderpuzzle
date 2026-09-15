class Solution {
  public:
    int maximumUnits(vector<vector<int>> &boxTypes, int truckSize) {
        // Every box spends one truck slot regardless of type, so each slot
        // should hold the richest box still available: sort by units per box
        // descending and fill the truck front-to-back.
        sort(boxTypes.begin(), boxTypes.end(), [](const vector<int> &a, const vector<int> &b) { return a[1] > b[1]; });
        long long unitsTotal = 0;
        int remaining = truckSize;
        for (const auto &box : boxTypes) {
            if (remaining == 0) {
                break;
            }
            int take = min(box[0], remaining);
            // the total tops out at 10^9 — inside the 32-bit return range,
            // but narrowly, so the sum runs in a long long and narrows on return
            unitsTotal += (long long)take * box[1];
            remaining -= take;
        }
        return (int)unitsTotal;
    }
};
