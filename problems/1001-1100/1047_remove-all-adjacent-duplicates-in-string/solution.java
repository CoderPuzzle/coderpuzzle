class Solution {

    public String removeDuplicates(String s) {
        StringBuilder stack = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            int top = stack.length() - 1;
            if (top >= 0 && stack.charAt(top) == ch) {
                stack.deleteCharAt(top);
            } else {
                stack.append(ch);
            }
        }
        return stack.toString();
    }
}
