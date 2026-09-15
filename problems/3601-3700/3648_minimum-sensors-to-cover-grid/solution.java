class Solution {

    public int minSensors(int n, int m, int k) {
        // A radius-k sensor covers an s x s square with s = 2 * k + 1, so
        // tile the grid: ceil(n / s) row strips times ceil(m / s) column
        // strips, one sensor per block.
        int side = 2 * k + 1;
        return ((n + side - 1) / side) * ((m + side - 1) / side);
    }
}
