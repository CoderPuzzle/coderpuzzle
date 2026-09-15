class Solution {

    public long maxTotalFruits(int[][] fruits, int startPos, int k) {
        int n = fruits.length;
        // An optimal walk turns at most once, so the harvest is always one
        // contiguous interval of the position-sorted fruit array. Prefix
        // sums give each interval's fruit total in O(1).
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + fruits[i][1];
        }

        long best = 0;
        int left = 0;
        // Two-pointer sweep: shrink while the interval exceeds k, and
        // re-check affordability before counting (a lone unreachable fruit
        // never contributes). Both pointers only advance, so linear overall.
        for (int right = 0; right < n; right++) {
            while (left < right && windowCost(fruits[left][0], fruits[right][0], startPos) > k) {
                left++;
            }
            if (windowCost(fruits[left][0], fruits[right][0], startPos) <= k) {
                best = Math.max(best, prefix[right + 1] - prefix[left]);
            }
        }
        return best;
    }

    private int windowCost(int leftPos, int rightPos, int startPos) {
        // Cheapest cost of covering the interval from startPos: straight
        // line when the start lies outside it; otherwise double the leg
        // walked first, taking the better direction to double.
        if (startPos <= leftPos) {
            return rightPos - startPos;
        }
        if (startPos >= rightPos) {
            return startPos - leftPos;
        }
        return Math.min(
            2 * (startPos - leftPos) + (rightPos - startPos),
            2 * (rightPos - startPos) + (startPos - leftPos)
        );
    }
}
