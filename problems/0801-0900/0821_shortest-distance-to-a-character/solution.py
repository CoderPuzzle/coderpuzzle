from typing import List


class Solution:
    def shortestToChar(self, s: str, c: str) -> List[int]:
        # Two passes over s. Forward, each cell records its distance to the
        # nearest c at or before it; backward, the mirrored sweep offers the
        # distance to the nearest c at or after it, kept only where it beats
        # what the forward pass wrote. A cell that is itself c lands on 0 in
        # both sweeps, and the sentinels (-n, 2n) stand in for "no c seen
        # yet" with a distance no real neighbour can lose to.
        n = len(s)
        answer = [0] * n
        last = -n
        for i, ch in enumerate(s):
            if ch == c:
                last = i
            answer[i] = i - last
        last = 2 * n
        for i in range(n - 1, -1, -1):
            if s[i] == c:
                last = i
            if last - i < answer[i]:
                answer[i] = last - i
        return answer
