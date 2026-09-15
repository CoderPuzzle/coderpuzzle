from typing import List


class Solution:
    def permute(self, n: int, k: int) -> List[int]:
        # Counts only ever face comparison against k (<= 1e15), so the
        # factorials may saturate at a cap above 1e15: a saturated count
        # still reads as "more permutations than k needs".
        cap = 2 * 10**15
        half = (n + 1) // 2
        fact = [1] * (half + 1)
        for i in range(2, half + 1):
            fact[i] = min(fact[i - 1] * i, cap)
        result: List[int] = []
        # One flag per value: the greedy consumes each of 1..n at most once.
        used = [False] * (n + 1)
        odds_left = (n + 1) // 2
        evens_left = n // 2
        last_parity = -1
        for _ in range(n):
            # Ascending candidates: skip past the ones whose completion
            # count is too small to still hold k, reducing k by their size.
            placed = False
            for value in range(1, n + 1):
                if used[value] or value % 2 == last_parity:
                    continue
                odd = odds_left - (value % 2)
                even = evens_left - (1 - value % 2)
                # Once this value lands, the remaining parity pattern is
                # forced: the slots alternate starting with the opposite
                # parity, so the count is odd! * even! exactly when the
                # leftover values fit that pattern, and 0 otherwise.
                rest = n - len(result) - 1
                odd_slots = (rest + 1 - value % 2) // 2
                ways = min(fact[odd] * fact[even], cap) if odd_slots == odd and rest - odd_slots == even else 0
                if ways >= k:
                    used[value] = True
                    result.append(value)
                    if value % 2:
                        odds_left -= 1
                    else:
                        evens_left -= 1
                    last_parity = value % 2
                    placed = True
                    break
                k -= ways
            if not placed:
                # Fewer than k alternating permutations exist.
                return []
        return result
