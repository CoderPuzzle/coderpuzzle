import java.util.Arrays;

class Solution {

    public int maxBoxesInWarehouse(int[] boxes, int[] warehouse) {
        // A box can enter from either side, so room i only has to survive
        // whichever path is more forgiving: the prefix minimum coming from
        // the left, or the suffix minimum coming from the right.
        int n = warehouse.length;
        int[] prefixMin = new int[n];
        int running = warehouse[0];
        for (int i = 0; i < n; ++i) {
            running = Math.min(running, warehouse[i]);
            prefixMin[i] = running;
        }

        int[] suffixMin = new int[n];
        running = warehouse[n - 1];
        for (int i = n - 1; i >= 0; --i) {
            running = Math.min(running, warehouse[i]);
            suffixMin[i] = running;
        }

        int[] effective = new int[n];
        for (int i = 0; i < n; ++i) {
            effective[i] = Math.max(prefixMin[i], suffixMin[i]);
        }

        // effective is no longer monotonic, so sort both sides and sweep
        // with two pointers: the smallest remaining box is the best fit
        // for the smallest remaining room capacity.
        Arrays.sort(effective);
        int[] sortedBoxes = boxes.clone();
        Arrays.sort(sortedBoxes);
        int placed = 0;
        int j = 0;
        for (int i = 0; i < n; ++i) {
            if (j >= sortedBoxes.length) break;
            if (sortedBoxes[j] <= effective[i]) {
                placed++;
                j++;
            }
        }
        return placed;
    }
}
