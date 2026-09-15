import java.util.Arrays;

class Solution {

    public int maxBoxesInWarehouse(int[] boxes, int[] warehouse) {
        // A box entering from room 0 can only ever reach room i if every
        // room 0..i also let it through, so the height that actually
        // matters at position i is the prefix minimum of warehouse[0..i].
        int n = warehouse.length;
        int[] effective = new int[n];
        int runningMin = warehouse[0];
        for (int i = 0; i < n; ++i) {
            runningMin = Math.min(runningMin, warehouse[i]);
            effective[i] = runningMin;
        }

        // effective is non-increasing outward-to-inward, so read it from the
        // back (deepest room, smallest allowance) forward. Match it against
        // boxes sorted ascending: the smallest remaining box is the best fit
        // for the tightest remaining room.
        int[] sortedBoxes = boxes.clone();
        Arrays.sort(sortedBoxes);
        int placed = 0;
        int j = 0;
        for (int i = n - 1; i >= 0; --i) {
            if (j >= sortedBoxes.length) break;
            if (sortedBoxes[j] <= effective[i]) {
                placed++;
                j++;
            }
        }
        return placed;
    }
}
