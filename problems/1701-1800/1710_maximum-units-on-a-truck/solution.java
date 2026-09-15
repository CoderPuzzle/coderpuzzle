import java.util.Arrays;

class Solution {

    public int maximumUnits(int[][] boxTypes, int truckSize) {
        // Every box spends one truck slot regardless of type, so each slot
        // should hold the richest box still available: sort by units per box
        // descending and fill the truck front-to-back.
        Arrays.sort(boxTypes, (a, b) -> Integer.compare(b[1], a[1]));
        long unitsTotal = 0;
        int remaining = truckSize;
        for (int[] box : boxTypes) {
            if (remaining == 0) {
                break;
            }
            int take = Math.min(box[0], remaining);
            // the total tops out at 10^9 — inside the 32-bit return range,
            // but narrowly, so the sum runs in a long and narrows on return
            unitsTotal += (long) take * box[1];
            remaining -= take;
        }
        return (int) unitsTotal;
    }
}
