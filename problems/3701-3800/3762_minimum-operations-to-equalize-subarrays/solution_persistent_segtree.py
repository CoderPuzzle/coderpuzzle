from typing import List


class Solution:
    def minOperations(self, nums: List[int], k: int, queries: List[List[int]]) -> List[int]:
        n = len(nums)
        # Remainder runs: a window is equalizable iff it sits inside one
        # maximal run of equal remainders, i.e. iff l and r share a mark.
        run = [0] * n
        for i in range(1, n):
            run[i] = run[i - 1] + (1 if nums[i] % k != nums[i - 1] % k else 0)
        quot = [v // k for v in nums]
        # Persistent segment tree over the compressed quotients: version i
        # counts the occurrences among nums[0..i-1], so the window [l, r]
        # is version r + 1 minus version l. Node 0 is the empty version.
        vals = sorted(set(quot))
        m = len(vals)
        rank = {value: idx for idx, value in enumerate(vals)}
        left = [0]
        right = [0]
        cnt = [0]
        tot = [0]
        left_append = left.append
        right_append = right.append
        cnt_append = cnt.append
        tot_append = tot.append

        def insert(prev: int, pos: int, value: int) -> int:
            # Path-copy one root-to-leaf route into fresh nodes; the
            # untaken children keep pointing at the previous version.
            node = len(left)
            left_append(left[prev])
            right_append(right[prev])
            cnt_append(cnt[prev] + 1)
            tot_append(tot[prev] + value)
            root = node
            old = prev
            lo, hi = 0, m - 1
            while lo < hi:
                mid = (lo + hi) >> 1
                go_left = pos <= mid
                old = left[old] if go_left else right[old]
                child = len(left)
                left_append(left[old])
                right_append(right[old])
                cnt_append(cnt[old] + 1)
                tot_append(tot[old] + value)
                if go_left:
                    left[node] = child
                    hi = mid
                else:
                    right[node] = child
                    lo = mid + 1
                node = child
            return root

        roots = [0] * (n + 1)
        for i, value in enumerate(quot):
            roots[i + 1] = insert(roots[i], rank[value], value)

        answers = []
        for l, r in queries:
            if run[l] != run[r]:
                answers.append(-1)
                continue
            a, b = roots[l], roots[r + 1]
            window_sum = tot[b] - tot[a]
            size = r - l + 1
            need = (size + 1) >> 1
            below_count = 0
            below_sum = 0
            lo, hi = 0, m - 1
            while lo < hi:
                mid = (lo + hi) >> 1
                left_count = cnt[left[b]] - cnt[left[a]]
                if need <= left_count:
                    a = left[a]
                    b = left[b]
                    hi = mid
                else:
                    need -= left_count
                    below_count += left_count
                    below_sum += tot[left[b]] - tot[left[a]]
                    a = right[a]
                    b = right[b]
                    lo = mid + 1
            median = vals[lo]
            # Below-median elements climb by their shortfall; elements at or
            # above descend by their excess; equals contribute nothing.
            answers.append(
                (median * below_count - below_sum) + ((window_sum - below_sum) - median * (size - below_count))
            )
        return answers
