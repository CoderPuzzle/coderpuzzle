class Solution:
    def digitsCount(self, d: int, low: int, high: int) -> int:
        # Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
        def count_up_to(d: int, n: int) -> int:
            if n <= 0:
                return 0
            digits = [int(ch) for ch in str(n)]
            length = len(digits)
            # Free (non-tight) suffixes recur, so they are memoized per
            # (position, started): (completions, occurrences) pairs.
            memo: dict[tuple[int, int], tuple[int, int]] = {}

            # Each state reports how many suffix completions it admits and how
            # many appearances of d those completions contain.
            def solve(pos: int, tight: bool, started: bool) -> tuple[int, int]:
                if pos == length:
                    return (1, 0)
                if not tight and (pos, started) in memo:
                    return memo[(pos, started)]
                max_digit = digits[pos] if tight else 9
                completions = 0
                occurrences = 0
                for digit in range(max_digit + 1):
                    inner = solve(pos + 1, tight and digit == max_digit, started or digit > 0)
                    completions += inner[0]
                    occurrences += inner[1]
                    # Placing d here shows d in every completion below, unless
                    # it is a leading zero -- those are never written.
                    if digit == d and (started or digit > 0):
                        occurrences += inner[0]
                if not tight:
                    memo[(pos, started)] = (completions, occurrences)
                return (completions, occurrences)

            # The all-zero completion is the number 0 and carries no
            # appearances, so the walk tallies exactly the integers 1..n.
            return solve(0, True, False)[1]

        return count_up_to(d, high) - count_up_to(d, low - 1)
