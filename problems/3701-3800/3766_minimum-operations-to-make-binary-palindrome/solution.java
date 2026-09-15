class Solution {

    public int[] minOperations(int[] nums) {
        int[] answer = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            answer[i] = distance(nums[i]);
        }
        return answer;
    }

    // The definition, read literally: widen the offset d = 0, 1, 2, ...
    // and stop at the first d where either neighbor is a binary
    // palindrome; that first hit costs exactly d operations and no
    // palindrome can be closer.
    private int distance(int value) {
        for (int d = 0; ; d++) {
            // the down side floors at 1: values below have no binary form
            // without leading zeros
            if (value - d >= 1 && palindrome(value - d)) {
                return d;
            }
            if (palindrome(value + d)) {
                return d;
            }
        }
    }

    private boolean palindrome(int value) {
        String bits = Integer.toBinaryString(value);
        for (int left = 0, right = bits.length() - 1; left < right; left++, right--) {
            if (bits.charAt(left) != bits.charAt(right)) {
                return false;
            }
        }
        return true;
    }
}
