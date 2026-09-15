class Solution {

    public int numSteps(String s) {
        int steps = 0;
        int carry = 0;
        // Consume bits from the least significant end. An even digit takes
        // one step (divide by two); an odd digit takes two (add one, then
        // divide). The carry records the overflow pushed left by adding 1.
        for (int i = s.length() - 1; i > 0; i--) {
            int digit = (s.charAt(i) == '1' ? 1 : 0) + carry;
            if (digit % 2 == 0) {
                steps++;
                carry = digit / 2;
            } else {
                steps += 2;
                carry = (digit + 1) / 2;
            }
        }
        // Only the leading '1' is left; a pending carry makes it "10",
        // needing one final divide-by-two.
        return steps + carry;
    }
}
