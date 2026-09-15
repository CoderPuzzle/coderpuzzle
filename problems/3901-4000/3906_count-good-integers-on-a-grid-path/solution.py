class Solution:
    def countGoodIntegersOnPath(self, l: int, r: int, directions: str) -> int:
        selected = [False] * 16
        row = column = 0
        selected[0] = True
        for move in directions:
            if move == "D":
                row += 1
            else:
                column += 1
            selected[row * 4 + column] = True

        def count_up_to(bound: int) -> int:
            if bound < 0:
                return 0
            digits = [ord(ch) - 48 for ch in f"{bound:016d}"]
            dp = [[0] * 11 for _ in range(2)]
            dp[1][10] = 1
            for position in range(16):
                nxt = [[0] * 11 for _ in range(2)]
                for tight in range(2):
                    limit = digits[position] if tight else 9
                    for previous in range(11):
                        ways = dp[tight][previous]
                        if ways == 0:
                            continue
                        for digit in range(limit + 1):
                            if selected[position] and previous != 10 and digit < previous:
                                continue
                            next_previous = digit if selected[position] else previous
                            next_tight = int(tight == 1 and digit == limit)
                            nxt[next_tight][next_previous] += ways
                dp = nxt
            return sum(map(sum, dp))

        return count_up_to(r) - count_up_to(l - 1)
