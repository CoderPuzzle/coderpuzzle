class Solution {

    public boolean xorGame(int[] nums) {
        // Alice wins exactly when the board already folds to 0 (she wins
        // on the spot) or the count is even, letting her always hand Bob
        // a nonzero odd board he cannot escape.
        int xor = 0;
        for (int value : nums) {
            xor ^= value;
        }
        return xor == 0 || nums.length % 2 == 0;
    }
}
