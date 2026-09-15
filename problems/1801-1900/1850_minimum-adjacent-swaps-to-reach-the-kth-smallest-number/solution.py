from collections import defaultdict, deque


class Solution:
    def getMinSwaps(self, num: str, k: int) -> int:
        # Apply next-permutation k times to get the target digits, then the
        # minimum adjacent swaps to rearrange num into it is the inversion
        # count of the order-preserving digit matching.
        arr = [int(c) for c in num]

        def next_permutation(a):
            n = len(a)
            i = n - 2
            while i >= 0 and a[i] >= a[i + 1]:
                i -= 1
            j = n - 1
            while a[j] <= a[i]:
                j -= 1
            a[i], a[j] = a[j], a[i]
            a[i + 1 :] = reversed(a[i + 1 :])

        for _ in range(k):
            next_permutation(arr)

        slots = defaultdict(deque)
        for i, v in enumerate(int(c) for c in num):
            slots[v].append(i)
        perm = [slots[v].popleft() for v in arr]

        n = len(perm)
        tree = [0] * (n + 1)

        def update(x):
            x += 1
            while x <= n:
                tree[x] += 1
                x += x & (-x)

        def query(x):
            x += 1
            total = 0
            while x > 0:
                total += tree[x]
                x -= x & (-x)
            return total

        inv = 0
        seen = 0
        for idx in perm:
            inv += seen - query(idx)
            update(idx)
            seen += 1
        return inv
