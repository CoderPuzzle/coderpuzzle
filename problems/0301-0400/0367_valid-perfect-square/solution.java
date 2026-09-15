class Solution {

    public boolean isPerfectSquare(int num) {
        // Squares march upward in lockstep — 1, 4, 9, 16, … — the map
        // r -> r * r is strictly increasing over the positives, so "is num a
        // perfect square" asks whether one sorted row contains num, and a
        // sorted row is exactly what binary search interrogates. Keep the root
        // candidates in lo..hi (starting 1..num — a root never exceeds its own
        // number), square each midpoint, and move lo above a probe that fell
        // short or hi below one that overshot. An empty interval means no root;
        // only an exact hit ever returned true. The probe must outrun 32 bits:
        // num reaches 2³¹ - 1 and the first midpoint squares to
        // ~1.15 × 10¹⁸, so the square is held in a long and the midpoint is
        // taken as lo + (hi - lo) / 2 — lo + hi alone can pass the int cap.
        int lo = 1;
        int hi = num;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            long square = (long) mid * mid;
            if (square == num) {
                return true;
            }
            if (square < num) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return false;
    }
}
