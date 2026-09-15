class Solution {

    public int wateringPlants(int[] plants, int capacity) {
        int steps = plants.length;
        int remaining = capacity;
        for (int index = 0; index < plants.length; index++) {
            if (remaining < plants[index]) {
                steps += 2 * index;
                remaining = capacity;
            }
            remaining -= plants[index];
        }
        return steps;
    }
}
