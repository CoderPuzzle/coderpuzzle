class Solution {

    public int maximumSwap(int num) {
        // One swap can raise exactly one position, and a position is worth
        // more the further left it sits, so the best swap moves the largest
        // available digit as far left as it can go. Record the last index of
        // each digit value, then scan left to right: at the first position
        // where a larger digit occurs later, swap in the largest such digit,
        // taken from its LAST occurrence — the tiebreak pushes the displaced
        // smaller digit as far right as it can go. No qualifying position
        // means num is already maximal and is returned unchanged.
        char[] digits = Integer.toString(num).toCharArray();
        int[] last = new int[10];
        for (int i = 0; i < digits.length; i++) {
            last[digits[i] - '0'] = i;
        }
        for (int i = 0; i < digits.length; i++) {
            for (int value = 9; value > digits[i] - '0'; value--) {
                if (last[value] > i) {
                    char temp = digits[i];
                    digits[i] = digits[last[value]];
                    digits[last[value]] = temp;
                    return Integer.parseInt(new String(digits));
                }
            }
        }
        return num;
    }
}
