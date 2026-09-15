from typing import List


class Solution:
    def findPattern(self, stream: InfiniteStream, pattern: List[int]) -> int:
        length = len(pattern)
        want = 0
        for bit in pattern:
            want = (want << 1) | bit
        mask = (1 << length) - 1
        window = 0
        read = 0
        while True:
            # Roll the newest bit into the window; once the window is full,
            # it holds the last `length` bits read and starts at read-length.
            window = ((window << 1) | stream.next()) & mask
            read += 1
            if read >= length and window == want:
                return read - length
