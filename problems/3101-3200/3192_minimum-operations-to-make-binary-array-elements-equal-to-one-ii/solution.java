class Solution {

    public int minOperations(int[] nums) {
        // Prefix index 0 can only be fixed by a flip at i = 0, and after
        // fixing it nothing may flip it again — so a left-to-right sweep
        // is forced. flips parity tells whether the suffix has been
        // inverted an odd number of times so far; each effective 0 forces
        // one more flip, which also re-inverts every later position at
        // once. At most one operation per index, so the count fits int
        // for n <= 10^5.
        int ops = 0;
        boolean flipped = false;
        for (int bit : nums) {
            if ((bit == 1) == flipped) {
                ops++;
                flipped = !flipped;
            }
        }
        return ops;
    }
}
