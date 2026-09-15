class Solution {
  public:
    vector<int> toggleLightBulbs(vector<int> &bulbs) {
        // Toggle a fixed table indexed by bulb number; a bulb ends on exactly when
        // it is toggled an odd number of times. Sweep indices 1..100 and collect
        // the on positions — ascending order for free.
        vector<bool> on(101, false);
        for (int value : bulbs) {
            on[value] = !on[value];
        }
        vector<int> result;
        for (int i = 1; i <= 100; i++) {
            if (on[i]) {
                result.push_back(i);
            }
        }
        return result;
    }
};
