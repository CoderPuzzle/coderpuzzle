import java.util.Arrays;

class Solution {

    // Removing a run of t consecutive bars merges t+1 lines of cells
    // into one span, so each axis contributes side = longest run + 1 and
    // the square is limited by the smaller side. Only the bar lists
    // matter — n and m only bound where bars may sit. The area is at
    // most 101^2, well inside int.
    private int longestRun(int[] bars) {
        Arrays.sort(bars);
        int best = 1;
        int cur = 1;
        for (int i = 1; i < bars.length; i++) {
            cur = bars[i] == bars[i - 1] + 1 ? cur + 1 : 1;
            if (cur > best) best = cur;
        }
        return best;
    }

    public int maximizeSquareHoleArea(int n, int m, int[] hBars, int[] vBars) {
        int side = Math.min(longestRun(hBars), longestRun(vBars)) + 1;
        return side * side;
    }
}
