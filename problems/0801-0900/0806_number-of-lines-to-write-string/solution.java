class Solution {

    public int[] numberOfLines(int[] widths, String s) {
        // Only two numbers matter while the letters are written in order:
        // how wide the line being filled already is, and how many lines
        // have been started. A letter joins the current line when it keeps
        // the total within 100 pixels and opens the next line when it would
        // push past it, so a single left-to-right sweep over s ends holding
        // both answers: the line count and the last line's width.
        int lines = 1;
        int current = 0;
        for (int i = 0; i < s.length(); i++) {
            int width = widths[s.charAt(i) - 'a'];
            if (current + width > 100) {
                lines++;
                current = width;
            } else {
                current += width;
            }
        }
        return new int[] { lines, current };
    }
}
