class Solution:
    def countSteppingNumbers(self, low: str, high: str) -> int:
        MOD = 1_000_000_007

        def decrement(value: str) -> str:
            # value - 1 on a digit string (value >= 1); borrows turn 0s
            # into 9s and the collapsed leading digit is stripped.
            digits = list(value)
            i = len(digits) - 1
            while digits[i] == "0":
                digits[i] = "9"
                i -= 1
            digits[i] = str(int(digits[i]) - 1)
            stripped = "".join(digits).lstrip("0")
            return stripped or "0"

        def count_up_to(bound: str) -> int:
            # Stepping numbers in [1, bound], mod MOD; bound "0" gives 0.
            if bound == "0":
                return 0
            n = len(bound)
            # ways[m][d]: mod-count of ways to append m further digits after
            # a digit d, each differing by exactly 1 from its predecessor.
            ways = [[0] * 10 for _ in range(n)]
            ways[0] = [1] * 10
            for m in range(1, n):
                for d in range(10):
                    total = ways[m - 1][d - 1] if d > 0 else 0
                    if d < 9:
                        total += ways[m - 1][d + 1]
                    ways[m][d] = total % MOD
            count = 0
            # Every length below n: first digit 1..9 (no leading zero),
            # then any completion.
            for length in range(1, n):
                for d in range(1, 10):
                    count += ways[length - 1][d]
            # Length n: walk the bound's digits under a tight flag. A smaller
            # digit at the first mismatching position settles the comparison;
            # the tail then completes in ways[n - 1 - i][choice] ways.
            prev = -1
            for i, ch in enumerate(bound):
                digit = ord(ch) - 48
                for choice in range(1 if i == 0 else 0, digit):
                    if prev < 0 or abs(choice - prev) == 1:
                        count += ways[n - 1 - i][choice]
                if prev >= 0 and abs(digit - prev) != 1:
                    return count % MOD
                prev = digit
            return (count + 1) % MOD  # the bound itself survived the walk

        return (count_up_to(high) - count_up_to(decrement(low))) % MOD
