class Solution {
  public:
    int maxBoxesInWarehouse(vector<int> &boxes, vector<int> &warehouse) {
        // A box can enter from either side, so room i only has to survive
        // whichever path is more forgiving: the prefix minimum coming from
        // the left, or the suffix minimum coming from the right.
        int n = (int)warehouse.size();
        vector<int> prefixMin(n);
        int running = warehouse[0];
        for (int i = 0; i < n; ++i) {
            running = min(running, warehouse[i]);
            prefixMin[i] = running;
        }

        vector<int> suffixMin(n);
        running = warehouse[n - 1];
        for (int i = n - 1; i >= 0; --i) {
            running = min(running, warehouse[i]);
            suffixMin[i] = running;
        }

        vector<int> effective(n);
        for (int i = 0; i < n; ++i) {
            effective[i] = max(prefixMin[i], suffixMin[i]);
        }

        // effective is no longer monotonic, so sort both sides and sweep
        // with two pointers: the smallest remaining box is the best fit
        // for the smallest remaining room capacity.
        sort(effective.begin(), effective.end());
        sort(boxes.begin(), boxes.end());
        int placed = 0;
        int j = 0;
        for (int i = 0; i < n; ++i) {
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
