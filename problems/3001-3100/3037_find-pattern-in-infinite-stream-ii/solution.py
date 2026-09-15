from typing import List


class Solution:
    def findPattern(self, stream: InfiniteStream, pattern: List[int]) -> int:
        m = len(pattern)
        # Failure function: fail[i] is the length of the longest proper
        # prefix of pattern[:i+1] that is also its suffix.
        fail = [0] * m
        k = 0
        for i in range(1, m):
            while k > 0 and pattern[i] != pattern[k]:
                k = fail[k - 1]
            if pattern[i] == pattern[k]:
                k += 1
            fail[i] = k
        # Consume the stream through the KMP automaton: `matched` is the
        # longest pattern prefix ending at the bit just read.
        matched = 0
        read = 0
        while True:
            bit = stream.next()
            read += 1
            while matched > 0 and bit != pattern[matched]:
                matched = fail[matched - 1]
            if bit == pattern[matched]:
                matched += 1
            if matched == m:
                return read - m
