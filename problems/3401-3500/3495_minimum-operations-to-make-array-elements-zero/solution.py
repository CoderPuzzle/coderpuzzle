class Solution:
    def minOperations(self, queries: List[List[int]]) -> int:
        # cost(x) = k for x in [4^(k-1), 4^k): one "/4" step per band. An
        # operation performs two steps, so a query with S total steps over
        # [l, r] needs ceil(S / 2) operations; sum the steps per band.
        def steps_up_to(v):
            total = 0
            low, k = 1, 1
            while low <= v:
                high = min(v, low * 4 - 1)
                total += k * (high - low + 1)
                low *= 4
                k += 1
            return total

        ops = 0
        for l, r in queries:
            s = steps_up_to(r) - steps_up_to(l - 1)
            ops += (s + 1) // 2
        return ops
