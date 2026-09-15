class Solution:
    def shortestWay(self, source: str, target: str) -> int:
        n, m = len(source), len(target)
        j = 0
        count = 0
        while j < m:
            # One pass through source: greedily consume as much of the
            # remaining target as a subsequence match allows.
            start = j
            for i in range(n):
                if j < m and source[i] == target[j]:
                    j += 1
            # A pass that matched nothing means target[j] never occurs in
            # source at all, so target can never be finished.
            if j == start:
                return -1
            count += 1
        return count
