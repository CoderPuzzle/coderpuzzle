from typing import List


class Solution:
    def compress(self, chars: List[str]) -> int:
        # Two indexes share one pass: read scans a group of equal
        # characters to its end, write stores the compressed form back
        # into chars itself. A group of k characters compresses to
        # 1 + digits(k) slots — never more than k — so the write frontier
        # always trails the read frontier and overwriting in place is
        # safe. Only the indexes and the run count live outside the
        # array, and the final write index is the compressed length.
        write = 0
        read = 0
        n = len(chars)
        while read < n:
            ch = chars[read]
            run_end = read
            while run_end < n and chars[run_end] == ch:
                run_end += 1
            count = run_end - read
            chars[write] = ch
            write += 1
            if count > 1:
                for digit in str(count):
                    chars[write] = digit
                    write += 1
            read = run_end
        return write
