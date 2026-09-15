import java.util.Arrays;

class Solution {

    public int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        // Each residue class (r, c) mod sideLength appears in every window
        // exactly once, so the constraint binds classes. Count how many
        // grid cells fall into each class: full blocks plus the leftover
        // strip when the remainder reaches r (or c).
        long[] counts = new long[sideLength * sideLength];
        for (int r = 0; r < sideLength; r++) {
            for (int c = 0; c < sideLength; c++) {
                long rows = height / sideLength + (height % sideLength > r ? 1 : 0);
                long cols = width / sideLength + (width % sideLength > c ? 1 : 0);
                counts[r * sideLength + c] = rows * cols;
            }
        }
        Arrays.sort(counts);
        long total = 0;
        for (int i = 0; i < maxOnes; i++) {
            total += counts[counts.length - 1 - i];
        }
        return (int) total;
    }
}
