import java.util.function.IntPredicate;

class Solution {

    public int minArea(String[][] image, int x, int y) {
        // The region is connected, so its projection on each axis is one
        // contiguous range: every row between the topmost and bottommost
        // black row holds a black pixel, and likewise for columns. Each
        // "does this line hold a black pixel" predicate therefore flips
        // exactly once around the known black pixel (x, y).
        IntPredicate blackRow = r -> {
            for (String cell : image[r]) {
                if (cell.equals("1")) return true;
            }
            return false;
        };
        IntPredicate blackCol = c -> {
            for (String[] row : image) {
                if (row[c].equals("1")) return true;
            }
            return false;
        };
        // Each bound is a binary search outward from (x, y): the line through
        // (x, y) itself is black, so every window probed still brackets it.
        int top = firstBlack(0, x, blackRow);
        int bottom = lastBlack(x, image.length - 1, blackRow);
        int left = firstBlack(0, y, blackCol);
        int right = lastBlack(y, image[0].length - 1, blackCol);
        // The smallest enclosing rectangle is the cross of the two spans.
        return (bottom - top + 1) * (right - left + 1);
    }

    // First line in [lo, hi] that is black; has(hi) always holds because the
    // range brackets the line through (x, y) itself.
    private int firstBlack(int lo, int hi, IntPredicate has) {
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (has.test(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    // Last line in [lo, hi] that is black; the +1 in the midpoint keeps the
    // window shrinking when only two lines remain.
    private int lastBlack(int lo, int hi, IntPredicate has) {
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (has.test(mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }
}
