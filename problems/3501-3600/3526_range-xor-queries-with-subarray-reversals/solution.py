from typing import List, Optional


class _Node:
    __slots__ = ("val", "prio", "size", "xor", "rev", "left", "right")

    def __init__(self, val, prio):
        self.val = val
        self.prio = prio
        self.size = 1
        self.xor = val
        self.rev = False
        self.left = None
        self.right = None


class Solution:
    def getResults(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        seed = 123456789

        def next_prio():
            nonlocal seed
            seed = (seed * 1103515245 + 12345) % (1 << 31)
            return seed

        def _size(t):
            return t.size if t else 0

        def _xor(t):
            return t.xor if t else 0

        def _push(t):
            if t and t.rev:
                t.rev = False
                t.left, t.right = t.right, t.left
                if t.left:
                    t.left.rev = not t.left.rev
                if t.right:
                    t.right.rev = not t.right.rev

        def _pull(t):
            if t:
                t.size = 1 + _size(t.left) + _size(t.right)
                t.xor = t.val ^ _xor(t.left) ^ _xor(t.right)

        def _merge(a, b):
            if not a or not b:
                return a or b
            _push(a)
            _push(b)
            if a.prio < b.prio:
                a.right = _merge(a.right, b)
                _pull(a)
                return a
            b.left = _merge(a, b.left)
            _pull(b)
            return b

        def _split(t, k):
            # Split into (first k nodes, the rest).
            if not t:
                return None, None
            _push(t)
            left = _size(t.left)
            if k <= left:
                a, b = _split(t.left, k)
                t.left = b
                _pull(t)
                return a, t
            a, b = _split(t.right, k - left - 1)
            t.right = a
            _pull(t)
            return t, b

        root = None
        for value in nums:
            root = _merge(root, _Node(value, next_prio()))

        out = []
        for q in queries:
            typ = q[0]
            if typ == 1:
                index, value = q[1], q[2]
                a, b = _split(root, index)
                mid, c = _split(b, 1)
                mid.val = value
                mid.xor = value
                root = _merge(a, _merge(mid, c))
            elif typ == 2:
                left, right = q[1], q[2]
                a, b = _split(root, left)
                mid, c = _split(b, right - left + 1)
                out.append(_xor(mid))
                root = _merge(a, _merge(mid, c))
            else:  # typ == 3
                left, right = q[1], q[2]
                a, b = _split(root, left)
                mid, c = _split(b, right - left + 1)
                mid.rev = not mid.rev
                root = _merge(a, _merge(mid, c))
        return out
