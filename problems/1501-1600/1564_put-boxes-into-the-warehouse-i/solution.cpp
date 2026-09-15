class Solution {
  public:
    int maxBoxesInWarehouse(vector<int> &boxes, vector<int> &warehouse) {
        // A box entering from room 0 can only ever reach room i if every
        // room 0..i also let it through, so the height that actually
        // matters at position i is the prefix minimum of warehouse[0..i].
        int n = (int)warehouse.size();
        vector<int> effective(n);
        int runningMin = warehouse[0];
        for (int i = 0; i < n; ++i) {
            runningMin = min(runningMin, warehouse[i]);
            effective[i] = runningMin;
        }

        // effective is non-increasing outward-to-inward, so read it from the
        // back (deepest room, smallest allowance) forward. Match it against
        // boxes sorted ascending: the smallest remaining box is the best
        // fit for the tightest remaining room.
        sort(boxes.begin(), boxes.end());
        int placed = 0;
        int j = 0;
        for (int i = n - 1; i >= 0; --i) {
            if (j >= (int)boxes.size())
                break;
            if (boxes[j] <= effective[i]) {
                ++placed;
                ++j;
            }
        }
        return placed;
    }
};
