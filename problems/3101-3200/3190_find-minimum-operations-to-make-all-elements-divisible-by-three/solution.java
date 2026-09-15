class Solution {

    public int minimumOperations(int[] nums) {
        // Elements are independent: each operation touches exactly one
        // element, so every element needs only the distance from its
        // nearest multiple of 3 — a remainder of 1 or 2 costs exactly one
        // +/- 1, remainder 0 costs nothing.
        int ops = 0;
        for (int v : nums) {
            int r = v % 3;
            ops += Math.min(r, r == 0 ? 0 : 3 - r);
        }
        return ops;
    }
}
