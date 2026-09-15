class Solution {

    public int minMaxDifference(int num) {
        // A remap rewrites every copy of one chosen digit, and the
        // notes allow leading zeroes plus mapping a digit to itself.
        // That forces the two greedy plays: promote every copy of the
        // first digit that is not already 9 up to 9 (a no-op when
        // there is none), and demote every copy of the leading digit
        // down to 0. Both rewrites only ever touch leftmost-first
        // repeats, so any other choice keeps some earlier position
        // lower or higher than necessary.
        String digits = Integer.toString(num);
        String big = digits;
        for (int i = 0; i < digits.length(); ++i) {
            char ch = digits.charAt(i);
            if (ch != '9') {
                big = digits.replace(ch, '9');
                break;
            }
        }
        String small = digits.replace(digits.charAt(0), '0');
        return Integer.parseInt(big) - Integer.parseInt(small);
    }
}
