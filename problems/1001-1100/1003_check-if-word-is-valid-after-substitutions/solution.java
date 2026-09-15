class Solution {

    public boolean isValid(String s) {
        // Every insertion of "abc" is reversible: removing an "abc"
        // substring from a valid string leaves another valid string, all
        // the way back to "". A stack turns that reversal into one pass —
        // whenever the top three entries read a, b, c, they are the most
        // recently completed insertion, so popping all three undoes it.
        StringBuilder stack = new StringBuilder();
        for (int index = 0; index < s.length(); index++) {
            stack.append(s.charAt(index));
            int top = stack.length();
            if (
                top >= 3 && stack.charAt(top - 3) == 'a' && stack.charAt(top - 2) == 'b' && stack.charAt(top - 1) == 'c'
            ) {
                stack.setLength(top - 3);
            }
        }
        // s was reachable by the operation iff nothing is left over.
        return stack.length() == 0;
    }
}
