class Solution {

    public int maxGoodNumber(int[] nums) {
        // Only 3! = 6 orders exist, so try each one exhaustively. Combining
        // is arithmetic: shift the accumulator left by the number's bit
        // width and OR the number into the freed bits. Three 7-bit values
        // concatenate to at most 21 bits, well inside int.
        int best = 0;
        int[][] orders = {
            { nums[0], nums[1], nums[2] },
            { nums[0], nums[2], nums[1] },
            { nums[1], nums[0], nums[2] },
            { nums[1], nums[2], nums[0] },
            { nums[2], nums[0], nums[1] },
            { nums[2], nums[1], nums[0] },
        };
        for (int[] order : orders) {
            int value = 0;
            for (int x : order) {
                value = (value << (32 - Integer.numberOfLeadingZeros(x))) | x;
            }
            best = Math.max(best, value);
        }
        return best;
    }
}
