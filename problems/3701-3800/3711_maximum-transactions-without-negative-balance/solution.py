from typing import List

import heapq


class Solution:
    def maxTransactions(self, transactions: List[int]) -> int:
        # Greedy scan with a max-heap of the debits already taken: take every
        # transaction that leaves the balance nonnegative, and when a debit
        # does not fit, refund the largest debit taken earlier if it was
        # strictly bigger and take the smaller one instead — same count, a
        # higher balance, and room for later, smaller debits. Running
        # balances reach 10^14, past 32-bit range, so accumulate in 64-bit
        # (Python ints are arbitrary-precision). The min-heap stores the raw
        # negative values, so its smallest entry is the largest magnitude.
        balance = 0
        kept = 0
        debits = []  # taken debits as negative values (smallest = biggest)
        for t in transactions:
            if t >= 0 or balance + t >= 0:
                kept += 1
                balance += t
                if t < 0:
                    heapq.heappush(debits, t)
            elif debits and debits[0] < t:
                balance -= heapq.heappop(debits)  # refund the larger debit
                balance += t
                heapq.heappush(debits, t)
        return kept
