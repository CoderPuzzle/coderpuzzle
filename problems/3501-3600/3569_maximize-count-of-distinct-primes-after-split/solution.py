from bisect import bisect_left, insort
from typing import List


class Solution:
    def maximumCount(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        # A prime counts on both sides of a split at k exactly when k lies in
        # [first + 1, last] of its occurrence indices, so every query answer
        # is (distinct primes present) + (deepest interval overlap). Each
        # prime value keeps a sorted list of its occurrence indices, and an
        # interval entering or leaving is two point updates in a max-prefix
        # segment tree over the split positions (+1 at first+1, -1 at
        # last+1): the root stores the largest prefix sum of the event
        # array, i.e. the best overlap, and the update work per query is a
        # constant number of interval insertions and removals.
        limit = 100001
        is_prime = [True] * limit
        is_prime[0] = is_prime[1] = False
        for i in range(2, int(limit**0.5) + 1):
            if is_prime[i]:
                for j in range(i * i, limit, i):
                    is_prime[j] = False

        n = len(nums)
        size = 1
        while size < n:
            size <<= 1
        seg_sum = [0] * (2 * size)
        seg_best = [0] * (2 * size)

        def add_event(pos: int, delta: int) -> None:
            u = size + pos - 1
            seg_sum[u] += delta
            seg_best[u] = seg_sum[u] if seg_sum[u] > 0 else 0
            u >>= 1
            while u:
                left = u + u
                seg_sum[u] = seg_sum[left] + seg_sum[left + 1]
                cross = seg_sum[left] + seg_best[left + 1]
                seg_best[u] = cross if cross > seg_best[left] else seg_best[left]
                u >>= 1

        def events(idxs: List[int], sign: int) -> None:
            # sign +1 installs the interval [first + 1, last], sign -1 clears it.
            add_event(idxs[0] + 1, sign)
            add_event(idxs[-1] + 1, -sign)

        cur = list(nums)
        occ = {}  # prime value -> sorted index list
        distinct = 0
        for i, v in enumerate(cur):
            if is_prime[v]:
                if v not in occ:
                    occ[v] = []
                    distinct += 1
                occ[v].append(i)
        for idxs in occ.values():
            if len(idxs) >= 2:
                events(idxs, 1)

        answers = []
        for idx, val in queries:
            old = cur[idx]
            if old != val:
                if is_prime[old]:
                    if len(occ[old]) >= 2:
                        events(occ[old], -1)
                    del occ[old][bisect_left(occ[old], idx)]
                    if not occ[old]:
                        del occ[old]
                        distinct -= 1
                    elif len(occ[old]) >= 2:
                        events(occ[old], 1)
                if is_prime[val]:
                    if val in occ and len(occ[val]) >= 2:
                        events(occ[val], -1)
                    insort(occ.setdefault(val, []), idx)
                    if len(occ[val]) >= 2:
                        events(occ[val], 1)
                    else:
                        distinct += 1
                cur[idx] = val
            answers.append(distinct + seg_best[1])
        return answers
