from typing import List, Optional


class Solution:
    def score(self, cards: List[str], x: str) -> int:
        # A one-sided pool (class counts, zeros included) plus `helpers`
        # double-x cards: every pair consumes at least one letter card,
        # every pair needs a partner outside the largest class, and only
        # so many pairs fit at all — the tight bound is the smallest.
        def best_pairs(counts: List[int], helpers: int) -> int:
            total = sum(counts)
            if total == 0:
                return 0
            largest = max(counts)
            return min((total + helpers) // 2, total + helpers - largest, total)

        both = 0
        first_only = [0] * 26
        second_only = [0] * 26
        for card in cards:
            a, b = card[0], card[1]
            if a == x[0]:
                if b == x[0]:
                    both += 1
                else:
                    first_only[ord(b) - ord("a")] += 1
            elif b == x[0]:
                second_only[ord(a) - ord("a")] += 1

        # Keep the split loop over nonzero classes only; each double-x card
        # is spent on one side or the other, and every matching splits that
        # way, so scanning all splits covers everything.
        side_one = [count for count in first_only if count]
        side_two = [count for count in second_only if count]
        best = 0
        for give in range(both + 1):
            best = max(
                best,
                best_pairs(side_one, give) + best_pairs(side_two, both - give),
            )
        return best
