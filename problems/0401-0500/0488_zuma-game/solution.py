from typing import Dict, List, Tuple


class Solution:
    def findMinStep(self, board: str, hand: str) -> int:
        # Memoized search over (row, remaining hand). Only balls inserted
        # directly alongside a same-colored run are tried: a ball dropped
        # between foreign colors cannot join a removal before its neighbors
        # merge, so deferring its insertion to that merge never costs more.
        colors = "RYBGW"
        counts = [hand.count(color) for color in colors]
        memo: Dict[Tuple[str, Tuple[int, ...]], int] = {}
        impossible = 100  # above any answer: the hand holds at most 5 balls

        def clean(row: str) -> str:
            # The cascade as a pure function: one pass drops every maximal
            # run of three or more, the loop settles the joins that their
            # removal opens up.
            removed = True
            while removed:
                removed = False
                kept: List[str] = []
                i = 0
                while i < len(row):
                    j = i
                    while j < len(row) and row[j] == row[i]:
                        j += 1
                    if j - i < 3:
                        kept.append(row[i:j])
                    else:
                        removed = True
                    i = j
                row = "".join(kept)
            return row

        def solve(row: str, remaining: List[int]) -> int:
            if not row:
                return 0
            key = (row, tuple(remaining))
            if key in memo:
                return memo[key]
            best = impossible
            i = 0
            while i < len(row):
                j = i
                while j < len(row) and row[j] == row[i]:
                    j += 1
                color = colors.index(row[i])
                if remaining[color] > 0:
                    # One canonical gap per run: sliding the ball along the
                    # run it joins produces the identical next row.
                    remaining[color] -= 1
                    best = min(best, solve(clean(row[:i] + row[i] + row[i:]), remaining) + 1)
                    remaining[color] += 1
                i = j
            memo[key] = best
            return best

        best = solve(board, counts)
        return best if best < impossible else -1
