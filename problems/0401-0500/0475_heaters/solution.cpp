class Solution {
  public:
    int findRadius(vector<int> &houses, vector<int> &heaters) {
        // Only the heaters need order: each house binds to its nearest one.
        sort(heaters.begin(), heaters.end());
        int radius = 0;
        for (int house : houses) {
            // lower_bound lands on the first heater at or right of the house,
            // so the nearest heater is it, or the one just before.
            auto at = lower_bound(heaters.begin(), heaters.end(), house);
            int nearest;
            if (at == heaters.begin()) {
                nearest = *at - house;
            } else if (at == heaters.end()) {
                nearest = house - *prev(at);
            } else {
                nearest = min(house - *prev(at), *at - house);
            }
            radius = max(radius, nearest);
        }
        return radius;
    }
};
