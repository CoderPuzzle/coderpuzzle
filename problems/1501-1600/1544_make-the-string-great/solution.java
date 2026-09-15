class Solution {

    public String makeGood(String s) {
        // Walk the string once, keeping a stack of characters kept so far.
        // A new character only ever conflicts with the character directly
        // above it on the stack, because anything further down was already
        // separated from it by characters that didn't cancel. So comparing
        // against just the top is enough to reproduce the full repeated
        // removal process in a single pass.
        StringBuilder stack = new StringBuilder();
        for (char ch : s.toCharArray()) {
            int top = stack.length() - 1;
            if (
                top >= 0 &&
                stack.charAt(top) != ch &&
                Character.toLowerCase(stack.charAt(top)) == Character.toLowerCase(ch)
            ) {
                stack.deleteCharAt(top);
            } else {
                stack.append(ch);
            }
        }
        return stack.toString();
    }
}
