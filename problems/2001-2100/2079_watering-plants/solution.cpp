class Solution {
  public:
    int wateringPlants(vector<int> &plants, int capacity) {
        int steps = plants.size();
        int remaining = capacity;
        for (int index = 0; index < static_cast<int>(plants.size()); index++) {
            if (remaining < plants[index]) {
                steps += 2 * index;
                remaining = capacity;
            }
            remaining -= plants[index];
        }
        return steps;
    }
};
