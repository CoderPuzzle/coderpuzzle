class Solution {

    // +1 at start, -1 past end, running sum > 0 means covered.
    public boolean isCovered(int[][] ranges, int left, int right) {
        int[] diff = new int[52];
        for (int[] r : ranges) {
            diff[r[0]] += 1;
            diff[r[1] + 1] -= 1;
        }
        boolean[] cover = new boolean[51];
        int cur = 0;
        for (int x = 1; x <= 50; x++) {
            cur += diff[x];
            cover[x] = cur > 0;
        }
        for (int x = left; x <= right; x++) {
            if (!cover[x]) {
                return false;
            }
        }
        return true;
    }
}
