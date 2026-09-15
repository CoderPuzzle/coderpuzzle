class Solution {

    public String smallestSubsequence(String s) {
        int[] last = new int[26];
        for (int i = 0; i < 26; i++) {
            last[i] = -1;
        }
        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;
        }
        boolean[] used = new boolean[26];
        StringBuilder stack = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (used[ch - 'a']) {
                continue;
            }
            int top = stack.length() - 1;
            while (top >= 0 && stack.charAt(top) > ch && last[stack.charAt(top) - 'a'] > i) {
                used[stack.charAt(top) - 'a'] = false;
                stack.deleteCharAt(top);
                top--;
            }
            stack.append(ch);
            used[ch - 'a'] = true;
        }
        return stack.toString();
    }
}
