class Solution {

    public String resultingString(String s) {
        // Left-to-right stack: a fresh character cancels the top when the
        // two are circular-adjacent; the pair exposed by a pop is exactly
        // the next pair the leftmost-first rule would remove.
        char[] stack = new char[s.length()];
        int top = 0;
        for (int index = 0; index < s.length(); index++) {
            char ch = s.charAt(index);
            if (top > 0) {
                int diff = (stack[top - 1] - ch + 26) % 26;
                if (diff == 1 || diff == 25) {
                    top--;
                    continue;
                }
            }
            stack[top++] = ch;
        }
        return new String(stack, 0, top);
    }
}
