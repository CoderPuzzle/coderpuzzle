from typing import List


class Solution:
    def beautifulIndices(self, s: str, a: str, b: str, k: int) -> List[int]:
        def occurrences(pattern: str, text: str) -> List[int]:
            # KMP failure function: pi[i] is the length of the longest proper
            # prefix of pattern[:i + 1] that is also its suffix.
            pi = [0] * len(pattern)
            matched = 0
            for i in range(1, len(pattern)):
                while matched > 0 and pattern[i] != pattern[matched]:
                    matched = pi[matched - 1]
                if pattern[i] == pattern[matched]:
                    matched += 1
                pi[i] = matched
            # One scan of text; on a full match the failure function keeps
            # the scan going instead of restarting, so periodic texts stay
            # linear.
            starts: List[int] = []
            matched = 0
            for i, ch in enumerate(text):
                while matched > 0 and ch != pattern[matched]:
                    matched = pi[matched - 1]
                if ch == pattern[matched]:
                    matched += 1
                if matched == len(pattern):
                    starts.append(i - len(pattern) + 1)
                    matched = pi[matched - 1]
            return starts

        in_a = occurrences(a, s)
        in_b = occurrences(b, s)
        result: List[int] = []
        # Both lists ascend and i - k grows along in_a, so the first
        # b-occurrence at or after i - k only moves forward: one merge-style
        # pass tests each window [i - k, i + k] in amortized constant time.
        low = 0
        for i in in_a:
            while low < len(in_b) and in_b[low] < i - k:
                low += 1
            if low < len(in_b) and in_b[low] <= i + k:
                result.append(i)
        return result
