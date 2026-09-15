class Solution {

    public boolean isSelfCrossing(int[] distance) {
        // A crossing shows up the moment it happens, and a new line can only
        // reach lines three, four, or five moves back — so one forward scan
        // with a three-case window on the last six distances decides.
        int[] d = distance;
        for (int i = 3; i < d.length; ++i) {
            // Fourth line crosses the line three back; touching counts.
            boolean fourth = d[i] >= d[i - 2] && d[i - 1] <= d[i - 3];
            // Fourth line exactly touches the second; the fifth then
            // reaches back to meet or pass the first.
            boolean fifth = i >= 4 && d[i - 1] == d[i - 3] && d[i] + d[i - 4] >= d[i - 2];
            // Sixth line cuts inward far enough to close onto the first.
            boolean sixth =
                i >= 5 &&
                d[i - 2] >= d[i - 4] &&
                d[i - 3] >= d[i - 1] &&
                d[i - 1] + d[i - 5] >= d[i - 3] &&
                d[i] >= d[i - 2] - d[i - 4];
            if (fourth || fifth || sixth) return true;
        }
        return false;
    }
}
