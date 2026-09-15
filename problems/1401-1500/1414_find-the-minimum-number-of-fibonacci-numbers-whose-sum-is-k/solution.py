from typing import List, Optional


class Solution:
    def findMinFibonacciNumbers(self, k: int) -> int:
        fibs = [1, 1]
        while fibs[-1] + fibs[-2] <= k:
            fibs.append(fibs[-1] + fibs[-2])
        # Zeckendorf: greedily taking the largest F <= k never lands on two
        # consecutive Fibonacci numbers, so this builds the unique minimal
        # (non-consecutive) representation term by term
        count = 0
        index = len(fibs) - 1
        while k > 0:
            # index only moves down — a single sweep over ~45 entries
            while fibs[index] > k:
                index -= 1
            k -= fibs[index]
            count += 1
        return count
