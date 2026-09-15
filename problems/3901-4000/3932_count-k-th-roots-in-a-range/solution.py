class Solution:
    def countKthRoots(self, l: int, r: int, k: int) -> int:
        if k == 1:
            return r - l + 1

        def count(bound: int) -> int:
            if bound < 0:
                return 0

            def fits(base: int) -> bool:
                value = 1
                for _ in range(k):
                    if base != 0 and value > bound // base:
                        return False
                    value *= base
                return value <= bound

            low, high = 0, bound
            while low < high:
                middle = (low + high + 1) // 2
                if fits(middle):
                    low = middle
                else:
                    high = middle - 1
            return low + 1

        return count(r) - count(l - 1)
