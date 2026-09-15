class Solution:
    def magicalString(self, n: int) -> int:
        # The string is its own run-length encoding: grouping it into
        # runs of equal characters yields lengths that spell the string
        # again ("1 22 11 2 ..." → lengths "1 2 2 1 ..."). Seed the
        # prefix 1, 2, 2; a read pointer walks that prefix as the count
        # sequence while a write pointer appends s[read] copies of the
        # flip character, which alternates between 1 and 2 from group to
        # group. Generate until n elements exist, then count the 1s in
        # the first n.
        s = [1, 2, 2]
        read = 2
        flip = 1
        while len(s) < n:
            s += [flip] * s[read]
            flip = 3 - flip
            read += 1
        return s[:n].count(1)
