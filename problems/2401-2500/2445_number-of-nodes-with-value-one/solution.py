class Solution:
    def numberOfNodes(self, n: int, queries: List[int]) -> int:
        # Order does not matter -- only how many times each subtree was
        # flipped. A node v's final value is the parity of (flips queried
        # on v) + (flips queried on every ancestor of v), since each such
        # query covers v too. Count queries per label, then sweep labels
        # 1..n passing accumulated flip counts parent -> child; the tree
        # shape guarantees the parent index v // 2 is already finished.
        from collections import Counter

        counts = Counter(queries)
        flips = [0] * (n + 1)
        total = 0
        for v in range(1, n + 1):
            inherited = flips[v // 2] if v >= 2 else 0
            flips[v] = inherited + counts.get(v, 0)
            if flips[v] % 2 == 1:
                total += 1
        return total
