class Solution {
  public:
    int compress(vector<string> &chars) {
        // Two indexes share one pass: read scans a group of equal
        // characters to its end, write stores the compressed form back
        // into chars itself. A group of k characters compresses to
        // 1 + digits(k) slots — never more than k — so the write frontier
        // always trails the read frontier and overwriting in place is
        // safe. Only the indexes and the run count live outside the
        // array, and the final write index is the compressed length.
        int write = 0, read = 0, n = (int)chars.size();
        while (read < n) {
            string ch = chars[read];
            int run_end = read;
            while (run_end < n && chars[run_end] == ch)
                ++run_end;
            int count = run_end - read;
            chars[write] = ch;
            ++write;
            if (count > 1) {
                for (char digit : to_string(count)) {
                    chars[write] = string(1, digit);
                    ++write;
                }
            }
            read = run_end;
        }
        return write;
    }
};
