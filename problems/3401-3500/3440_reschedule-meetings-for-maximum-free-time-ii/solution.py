from typing import List


class Solution:
    def maxFreeTime(self, eventTime: int, startTime: List[int], endTime: List[int]) -> int:
        # Removing meeting i frees the span between its neighbours, which is
        # g[i] + d + g[i+1] long with g the gaps around it. If i fits into a
        # gap OTHER than its two flanking ones, that whole span becomes free
        # time; otherwise i can only slide inside it, leaving g[i] + g[i+1]
        # free. Prefix/suffix maxima over the gap array make "largest
        # non-flanking gap" an O(1) lookup, so the scan stays linear.
        n = len(startTime)
        gaps = [0] * (n + 1)
        gaps[0] = startTime[0]
        for i in range(1, n):
            gaps[i] = startTime[i] - endTime[i - 1]
        gaps[n] = eventTime - endTime[n - 1]
        prefix = [0] * (n + 2)
        for i in range(n + 1):
            prefix[i + 1] = max(prefix[i], gaps[i])
        suffix = [0] * (n + 2)
        for i in range(n, -1, -1):
            suffix[i] = max(suffix[i + 1], gaps[i])
        answer = max(gaps)
        for i in range(n):
            duration = endTime[i] - startTime[i]
            # Largest gap outside i's two flanking gaps decides move vs slide.
            host = max(prefix[i], suffix[i + 2])
            merged = gaps[i] + gaps[i + 1]
            answer = max(answer, merged + duration if host >= duration else merged)
        return answer
