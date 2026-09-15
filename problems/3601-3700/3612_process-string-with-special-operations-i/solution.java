class Solution {

    public String processStr(String s) {
        // The specials mutate the result built so far: letters append,
        // '*' drops the tail, '#' doubles, '%' reverses. With s capped at
        // 20 chars the result never exceeds 2^19 characters, so building
        // the string directly is cheap and obviously correct.
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch >= 'a' && ch <= 'z') {
                result.append(ch);
            } else if (ch == '*') {
                if (result.length() > 0) {
                    result.setLength(result.length() - 1);
                }
            } else if (ch == '#') {
                // toString() captures the current content before appending,
                // which is what makes the self-duplication well-defined.
                result.append(result.toString());
            } else {
                // '%'
                result.reverse();
            }
        }
        return result.toString();
    }
}
