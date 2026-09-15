from typing import List, Optional


class Solution:
    def groupStrings(self, words: List[str]) -> List[int]:
        from collections import Counter

        mask_counter = Counter()
        for w in words:
            mask = 0
            for ch in w:
                mask |= 1 << (ord(ch) - 97)
            mask_counter[mask] += 1

        masks = list(mask_counter.keys())
        present = set(masks)
        index = {m: i for i, m in enumerate(masks)}
        parent = list(range(len(masks)))
        size_count = [mask_counter[m] for m in masks]

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[rb] = ra
                size_count[ra] += size_count[rb]

        full = (1 << 26) - 1
        for mask in masks:
            i = index[mask]
            # Add / delete one letter: masks differing in exactly one bit.
            for bit in range(26):
                neighbor = mask ^ (1 << bit)
                if neighbor in present:
                    union(i, index[neighbor])
            # Replace one letter: remove a present bit, add an absent bit.
            absent = full & ~mask
            removable = mask
            while removable:
                low = removable & -removable
                removable ^= low
                base = mask & ~low
                addable = absent
                while addable:
                    low2 = addable & -addable
                    addable ^= low2
                    neighbor = base | low2
                    if neighbor in present:
                        union(i, index[neighbor])

        roots = {find(k) for k in range(len(masks))}
        largest = max(size_count[k] for k in range(len(masks)) if find(k) == k)
        return [len(roots), largest]
