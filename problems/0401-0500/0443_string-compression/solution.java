class Solution {

    public int compress(String[] chars) {
        // Two indexes share one pass: read scans a group of equal
        // characters to its end, write stores the compressed form back
        // into chars itself. A group of k characters compresses to
        // 1 + digits(k) slots — never more than k — so the write frontier
        // always trails the read frontier and overwriting in place is
        // safe. Only the indexes and the run count live outside the
        // array, and the final write index is the compressed length.
        int write = 0,
            read = 0,
            n = chars.length;
        while (read < n) {
            String ch = chars[read];
            int runEnd = read;
            while (runEnd < n && chars[runEnd].equals(ch)) ++runEnd;
            int count = runEnd - read;
            chars[write] = ch;
            ++write;
            if (count > 1) {
                for (char digit : String.valueOf(count).toCharArray()) {
                    chars[write] = String.valueOf(digit);
                    ++write;
                }
            }
            read = runEnd;
        }
        return write;
    }
}
