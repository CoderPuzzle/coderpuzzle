from typing import List


class _BalanceTree:
    """Lazy segment tree over right endpoints holding balance scores that
    only ever receive range additions; finds the largest entry equal to 0."""

    def __init__(self, n: int):
        size = 1
        while size < n:
            size <<= 1
        self.size = size
        count = size << 1
        big = 1 << 30
        mn = [0] * count
        mx = [0] * count
        lz = [0] * count
        # Leaves past the array sit at `big` so they never read as zero.
        for i in range(size + n, count):
            mn[i] = mx[i] = big
        for p in range(size - 1, 0, -1):
            c = p << 1
            mn[p] = min(mn[c], mn[c + 1])
            mx[p] = max(mx[c], mx[c + 1])
        self.mn = mn
        self.mx = mx
        self.lz = lz

    def add(self, ql: int, qr: int, delta: int) -> None:
        mn, mx, lz, size = self.mn, self.mx, self.lz, self.size
        lo0 = lo = ql + size
        hi0 = qr + size
        hi = hi0 + 1
        while lo < hi:
            if lo & 1:
                mn[lo] += delta
                mx[lo] += delta
                lz[lo] += delta
                lo += 1
            if hi & 1:
                hi -= 1
                mn[hi] += delta
                mx[hi] += delta
                lz[hi] += delta
            lo >>= 1
            hi >>= 1
        # Recompute both boundary paths up to the root.
        for start in (lo0 >> 1, hi0 >> 1):
            p = start
            while p:
                c = p << 1
                mn[p] = min(mn[c], mn[c + 1]) + lz[p]
                mx[p] = max(mx[c], mx[c + 1]) + lz[p]
                p >>= 1

    def rightmost_zero(self) -> int:
        """Largest index whose entry equals 0, or -1 when none does. A
        subtree whose min/max straddle zero may still hold none, so the
        walk verifies leaves and backtracks through bracketing siblings."""
        mn, mx, lz, size = self.mn, self.mx, self.lz, self.size
        if not (mn[1] <= 0 <= mx[1]):
            return -1
        stack = [(1, 0)]
        while stack:
            node, acc = stack.pop()
            while node < size:
                acc += lz[node]
                left = node << 1
                right = left + 1
                left_ok = mn[left] + acc <= 0 <= mx[left] + acc
                right_ok = mn[right] + acc <= 0 <= mx[right] + acc
                if right_ok:
                    if left_ok:
                        stack.append((left, acc))
                    node = right
                elif left_ok:
                    node = left
                else:
                    node = -1
                    break
            if node >= 0 and mn[node] + acc == 0:
                return node - size
        return -1


class Solution:
    def longestBalanced(self, nums: List[int]) -> int:
        n = len(nums)
        # nxt[i] is the next position after i holding nums[i], or n when
        # the value never repeats: the point where a later copy takes over
        # the distinct counting for windows that start at or after i.
        nxt = [n] * n
        last = {}
        for i in range(n - 1, -1, -1):
            v = nums[i]
            nxt[i] = last.get(v, n)
            last[v] = i
        tree = _BalanceTree(n)
        # Seed balance(0, r): each value contributes its sign to every right
        # end at or after its first occurrence, via O(log n) range adds.
        seen = set()
        for i, v in enumerate(nums):
            if v not in seen:
                seen.add(v)
                tree.add(i, n - 1, 1 if v & 1 else -1)
        best = 0
        for l in range(n):
            r = tree.rightmost_zero()
            if r >= l and r - l + 1 > best:
                best = r - l + 1
            v = nums[l]
            s = 1 if v & 1 else -1
            # Sliding past l withdraws the sign exactly on ends that keep
            # counting this occurrence — those before its next occurrence.
            tree.add(l, nxt[l] - 1, -s)
        return best
