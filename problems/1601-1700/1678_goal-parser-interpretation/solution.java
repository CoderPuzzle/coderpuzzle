class Solution {

    public String interpret(String command) {
        // Scan left to right. 'G' emits "G" and advances 1. An open paren
        // can only begin "()" or "(al)": peek the next character — ')'
        // emits "o" and advances 2, 'a' emits "al" and advances 4.
        StringBuilder out = new StringBuilder();
        int i = 0;
        while (i < command.length()) {
            if (command.charAt(i) == 'G') {
                out.append('G');
                i += 1;
            } else if (command.charAt(i + 1) == ')') {
                out.append('o');
                i += 2;
            } else {
                out.append("al");
                i += 4;
            }
        }
        return out.toString();
    }
}
