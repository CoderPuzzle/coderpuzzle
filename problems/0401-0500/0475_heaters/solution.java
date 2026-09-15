import java.util.Arrays;

class Solution {

    public int findRadius(int[] houses, int[] heaters) {
        // Only the heaters need order: each house binds to its nearest one.
        Arrays.sort(heaters);
        int radius = 0;
        for (int house : houses) {
            // A miss reports -(insertion point) - 1; the insertion point is
            // the first heater at or right of the house, so the nearest
            // heater is it, or the one just before.
            int index = Arrays.binarySearch(heaters, house);
            if (index >= 0) {
                continue;
            }
            index = -index - 1;
            int nearest;
            if (index == 0) {
                nearest = heaters[0] - house;
            } else if (index == heaters.length) {
                nearest = house - heaters[index - 1];
            } else {
                nearest = Math.min(house - heaters[index - 1], heaters[index] - house);
            }
            radius = Math.max(radius, nearest);
        }
        return radius;
    }
}
