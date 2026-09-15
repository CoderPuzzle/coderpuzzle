class Solution {
  public:
    int maxBalancedShipments(vector<int> &weight) {
        // A run is balanced exactly where its last parcel is strictly
        // lighter than the run's heaviest parcel, so one sweep tracks the
        // open segment's maximum and closes on the first dip.
        int shipments = 0;
        int segmentMax = 0;
        for (int w : weight) {
            if (w < segmentMax) {
                // Closing here is never worse than waiting: delaying the
                // reset only shrinks what later segments could use.
                ++shipments;
                segmentMax = 0;
            } else if (w > segmentMax) {
                segmentMax = w;
            }
        }
        return shipments;
    }
};
