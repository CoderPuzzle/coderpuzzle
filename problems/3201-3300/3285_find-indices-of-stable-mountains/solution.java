import java.util.Arrays;

class Solution {

    public int[] stableMountains(int[] height, int threshold) {
        // Mountain i is stable exactly when its immediate predecessor is
        // strictly taller than the threshold; one left-to-right pass emits
        // the qualifying indices in ascending order.
        int[] stable = new int[height.length - 1];
        int size = 0;
        for (int i = 1; i < height.length; i++) {
            if (height[i - 1] > threshold) {
                stable[size++] = i;
            }
        }
        return Arrays.copyOf(stable, size);
    }
}
