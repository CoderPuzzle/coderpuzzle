class Solution {

    public String removeOccurrences(String s, String part) {
        // Stream s through a survivor stack. A removal can only expose
        // characters at the top, so after each push the last part.length()
        // chars are checked and popped when they spell out part — the
        // freshly exposed top then gets its own chance on a later push.
        int m = part.length();
        StringBuilder stack = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            stack.append(s.charAt(i));
            if (stack.length() >= m && stack.substring(stack.length() - m).equals(part)) {
                stack.setLength(stack.length() - m);
            }
        }
        return stack.toString();
    }
}
