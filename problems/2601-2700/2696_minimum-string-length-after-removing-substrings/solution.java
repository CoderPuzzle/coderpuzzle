class Solution {

    public int minLength(String s) {
        StringBuilder stack = new StringBuilder();
        for (int index = 0; index < s.length(); index++) {
            char ch = s.charAt(index);
            char prev = stack.length() > 0 ? stack.charAt(stack.length() - 1) : 0;
            if ((prev == 'A' && ch == 'B') || (prev == 'C' && ch == 'D')) {
                stack.deleteCharAt(stack.length() - 1);
            } else {
                stack.append(ch);
            }
        }
        return stack.length();
    }
}
