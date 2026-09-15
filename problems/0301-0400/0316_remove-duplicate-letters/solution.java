class Solution {

    public String removeDuplicateLetters(String s) {
        // count[c] = occurrences of c strictly after the current position.
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) count[s.charAt(i) - 'a']++;
        StringBuilder stack = new StringBuilder();
        boolean[] inStack = new boolean[26];
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            int c = ch - 'a';
            count[c]--;
            // A letter already placed stays put: a second copy can never help.
            if (inStack[c]) continue;
            // Local exchange: popping a larger top is safe exactly while it
            // still re-occurs later (count > 0), and only shrinks the prefix.
            while (stack.length() > 0) {
                int top = stack.charAt(stack.length() - 1) - 'a';
                if (top > c && count[top] > 0) {
                    stack.deleteCharAt(stack.length() - 1);
                    inStack[top] = false;
                } else {
                    break;
                }
            }
            stack.append(ch);
            inStack[c] = true;
        }
        return stack.toString();
    }
}
