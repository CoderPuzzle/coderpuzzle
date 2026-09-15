class Solution {

    public int maxFont(String text, int w, int h, int[] fonts, int[][] widths, int[] heights) {
        // Fit is monotonic in the font index (widths/heights only grow), so
        // binary search the boundary between fitting and not fitting.
        int lo = 0;
        int hi = fonts.length - 1;
        int answer = -1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (fits(text, w, h, widths, heights, mid)) {
                answer = fonts[mid];
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return answer;
    }

    private boolean fits(String text, int w, int h, int[][] widths, int[] heights, int index) {
        if (heights[index] > h) {
            return false;
        }
        int[] row = widths[index];
        long total = 0;
        for (int i = 0; i < text.length(); i++) {
            total += row[text.charAt(i) - 'a'];
            if (total > w) {
                return false;
            }
        }
        return true;
    }
}
