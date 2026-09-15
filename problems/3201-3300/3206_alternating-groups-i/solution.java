class Solution {

    public int numberOfAlternatingGroups(int[] colors) {
        // A 3-tile window centered on tile i alternates exactly when both
        // of i's circular neighbors differ from it, so count the tiles
        // whose previous and next tiles (wrapping around) hold the opposite
        // color.
        int n = colors.length;
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (colors[(i + n - 1) % n] != colors[i] && colors[i] != colors[(i + 1) % n]) {
                count++;
            }
        }
        return count;
    }
}
