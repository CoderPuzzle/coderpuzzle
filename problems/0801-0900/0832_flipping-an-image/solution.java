class Solution {

    public int[][] flipAndInvertImage(int[][] image) {
        // Cell (i, j) of the answer is 1 - image[i][n - 1 - j]: the
        // reversal and the inversion fold into a single exchange, so one
        // two-pointer sweep per row writes row[left] ^ 1 and row[right] ^ 1
        // in one swap. XOR by 1 is the invert — 0 ^ 1 = 1, 1 ^ 1 = 0.
        int n = image.length;
        for (int[] row : image) {
            int left = 0;
            int right = n - 1;
            while (left < right) {
                int invertedLeft = row[left] ^ 1;
                int invertedRight = row[right] ^ 1;
                row[left] = invertedRight;
                row[right] = invertedLeft;
                left++;
                right--;
            }
            // The middle cell of an odd-width row meets only itself in the
            // sweep, so it is inverted once, in place, afterwards.
            if (n % 2 == 1) {
                row[n / 2] ^= 1;
            }
        }
        return image;
    }
}
