from typing import List, Optional


class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        n = len(num)
        results = []

        def dfs(index, prev, current, expression):
            if index == n:
                # The evaluation travels with the search, so the leaf test is
                # a single comparison against target.
                if current == target:
                    results.append(expression)
                return
            # Each gap between digits decides two things: how far the operand
            # extends, then which operator joins it.
            for end in range(index, n):
                # A '0' at num[index] admits only the single-digit operand 0
                # (lone 0 is legal, 01 is not), so stop extending.
                if end != index and num[index] == "0":
                    break
                nxt = int(num[index : end + 1])
                if index == 0:
                    # The first operand seeds both the running total and the
                    # trailing multiplicand chain.
                    dfs(end + 1, nxt, nxt, str(nxt))
                else:
                    # '+'/'-' fold nxt straight into current; the chain resets
                    # to nxt (or -nxt, so a later '*' reverses the subtract).
                    dfs(end + 1, nxt, current + nxt, expression + "+" + str(nxt))
                    dfs(end + 1, -nxt, current - nxt, expression + "-" + str(nxt))
                    # '*' binds only to the trailing chain: swap its old
                    # contribution for prev * nxt.
                    dfs(
                        end + 1,
                        prev * nxt,
                        current - prev + prev * nxt,
                        expression + "*" + str(nxt),
                    )

        dfs(0, 0, 0, "")
        return results
