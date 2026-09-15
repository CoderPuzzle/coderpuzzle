from typing import List


class Solution:
    def isSolvable(self, words: List[str], result: str) -> bool:
        # Column-wise backtracking, mirroring hand addition: dfs(pos, row)
        # walks column pos of row `row`, accumulating a carry. Once every row
        # of the column is folded in, the sum's low digit must equal the
        # result letter's digit and the rest flows on as the new carry.
        value = {}
        used = [False] * 10
        letters = {ch for w in words for ch in w} | set(result)
        if len(letters) > 10:
            return False
        leading = {w[0] for w in words} | {result[0]}
        rows = [w[::-1] for w in words]  # index k = k-th column from the right
        target = result[::-1]
        widest = max(len(r) for r in rows)
        # Words have no leading zeros, so the sum is at least 10^(widest-1):
        # the result needs at least `widest` digits and at most widest + 1.
        if not (widest <= len(target) <= widest + 1):
            return False

        def dfs(pos: int, row: int, carry: int) -> bool:
            if pos == len(target):
                return carry == 0
            if row == len(rows):
                # All rows folded: bind the result letter of this column.
                digit = carry % 10
                ch = target[pos]
                if ch in value:
                    return value[ch] == digit and dfs(pos + 1, 0, carry // 10)
                if used[digit] or (digit == 0 and ch in leading):
                    return False
                value[ch] = digit
                used[digit] = True
                ok = dfs(pos + 1, 0, carry // 10)
                if not ok:
                    used[digit] = False
                    del value[ch]
                return ok
            ch = rows[row][pos] if pos < len(rows[row]) else None
            if ch is None:
                return dfs(pos, row + 1, carry)
            if ch in value:
                return dfs(pos, row + 1, carry + value[ch])
            for digit in range(10):
                if used[digit] or (digit == 0 and ch in leading):
                    continue
                value[ch] = digit
                used[digit] = True
                if dfs(pos, row + 1, carry + digit):
                    return True
                used[digit] = False
                del value[ch]
            return False

        return dfs(0, 0, 0)
