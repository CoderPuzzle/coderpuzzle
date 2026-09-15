class Solution {
  public:
    int minArea(vector<vector<string>> &image, int x, int y) {
        // The region is connected, so its projection on each axis is one
        // contiguous range: every row between the topmost and bottommost
        // black row holds a black pixel, and likewise for columns. Each
        // "does this line hold a black pixel" predicate therefore flips
        // exactly once around the known black pixel (x, y).
        auto hasBlackRow = [&](int r) {
            for (const string &cell : image[r])
                if (cell == "1")
                    return true;
            return false;
        };
        auto hasBlackCol = [&](int c) {
            for (const vector<string> &row : image)
                if (row[c] == "1")
                    return true;
            return false;
        };
        // Each bound is a binary search outward from (x, y): the line through
        // (x, y) itself is black, so every window probed still brackets it.
        int top = firstBlack(0, x, hasBlackRow);
        int bottom = lastBlack(x, image.size() - 1, hasBlackRow);
        int left = firstBlack(0, y, hasBlackCol);
        int right = lastBlack(y, image[0].size() - 1, hasBlackCol);
        // The smallest enclosing rectangle is the cross of the two spans.
        return (bottom - top + 1) * (right - left + 1);
    }

  private:
    // First line in [lo, hi] that is black; has(hi) always holds because the
    // range brackets the line through (x, y) itself.
    template <typename Predicate> int firstBlack(int lo, int hi, Predicate has) {
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (has(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }

    // Last line in [lo, hi] that is black; the +1 in the midpoint keeps the
    // window shrinking when only two lines remain.
    template <typename Predicate> int lastBlack(int lo, int hi, Predicate has) {
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (has(mid))
                lo = mid;
            else
                hi = mid - 1;
        }
        return lo;
    }
};
