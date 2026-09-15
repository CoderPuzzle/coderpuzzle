from typing import List


class Solution:
    def minValidStrings(self, words: List[str], target: str) -> int:
        # reach[i] is the largest L with target[i:i+L] a prefix of some word:
        # for each word, one Z-function over word + separator + target yields,
        # at every target offset, how many characters continue to match the
        # word's own prefix. With reach fixed, the pieces form a jump game:
        # standing at position i jumps right by any length in [1, reach[i]],
        # and the fewest jumps to cover n characters is the classic layered
        # greedy scan — every position folds its reach into the frontier
        # before the boundary trigger fires.
        n = len(target)
        codes = [ord(ch) for ch in target]
        reach = [0] * n
        for w in words:
            z = self._z_function([ord(ch) for ch in w] + [-1] + codes)
            base = len(w) + 1
            for i in range(n):
                if z[base + i] > reach[i]:
                    reach[i] = z[base + i]
        steps = 0
        cur_end = 0  # with `steps` pieces, target[:cur_end] is formable
        farthest = 0
        for i in range(n):
            r = i + reach[i]
            if r > farthest:
                farthest = r
            if i == cur_end:
                if farthest <= cur_end:
                    return -1
                steps += 1
                cur_end = farthest
                if cur_end >= n:
                    return steps
        return -1

    def _z_function(self, values):
        m = len(values)
        z = [0] * m
        z[0] = m
        left = right = 0
        for i in range(1, m):
            if i < right:
                z[i] = min(right - i, z[i - left])
            while i + z[i] < m and values[z[i]] == values[i + z[i]]:
                z[i] += 1
            if i + z[i] > right:
                left, right = i, i + z[i]
        return z
