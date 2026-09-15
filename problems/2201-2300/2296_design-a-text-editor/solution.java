class TextEditor {

    // Two stacks split at the cursor: left holds the text before the
    // cursor bottom-to-top, right the text after it nearest-char-on-top,
    // so the characters adjacent to the cursor are always the two ends.
    private final StringBuilder left = new StringBuilder();
    private final StringBuilder right = new StringBuilder();

    public TextEditor() {}

    public void addText(String text) {
        left.append(text);
    }

    public int deleteText(int k) {
        int deleted = Math.min(k, left.length());
        left.setLength(left.length() - deleted);
        return deleted;
    }

    public String cursorLeft(int k) {
        shift(left, right, k);
        return tail();
    }

    public String cursorRight(int k) {
        shift(right, left, k);
        return tail();
    }

    // Moves min(k, length) characters from the end of `from` onto the end
    // of `to` — exactly the cursor sliding k positions.
    private static void shift(StringBuilder from, StringBuilder to, int k) {
        for (int moved = Math.min(k, from.length()); moved > 0; --moved) {
            to.append(from.charAt(from.length() - 1));
            from.setLength(from.length() - 1);
        }
    }

    private String tail() {
        return left.substring(Math.max(0, left.length() - 10));
    }
}
