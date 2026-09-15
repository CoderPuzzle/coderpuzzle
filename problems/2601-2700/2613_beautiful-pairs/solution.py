from typing import List


class Solution:
    def beautifulPair(self, nums1: List[int], nums2: List[int]) -> List[int]:
        n = len(nums1)

        # Identical points sit at distance 0, the instant global minimum,
        # so a duplicate is answered directly from earliest occurrences.
        first_seen = {}
        dup = None
        for i in range(n):
            key = nums1[i] * 100001 + nums2[i]
            j = first_seen.get(key)
            if j is None:
                first_seen[key] = i
            elif dup is None or (j, i) < dup:
                dup = (j, i)
        if dup is not None:
            return [dup[0], dup[1]]

        # Closest pair under Manhattan distance via divide and conquer:
        # the conquer scan walks each strip point forward while the y-gap
        # is under the running bound, so every shorter cross pair is seen.
        xs = nums1[:]
        ys = nums2[:]

        def solve(order: List[int]) -> tuple:
            size = len(order)
            if size <= 3:
                delta = 1 << 60
                for a in range(size):
                    for b in range(a + 1, size):
                        gap = abs(xs[order[a]] - xs[order[b]]) + abs(ys[order[a]] - ys[order[b]])
                        delta = min(delta, gap)
                return delta, sorted(order, key=lambda i: ys[i])
            half = size // 2
            dl, left_sorted = solve(order[:half])
            dr, right_sorted = solve(order[half:])
            delta = min(dl, dr)
            merged = []
            a = b = 0
            while a < len(left_sorted) and b < len(right_sorted):
                if ys[left_sorted[a]] <= ys[right_sorted[b]]:
                    merged.append(left_sorted[a])
                    a += 1
                else:
                    merged.append(right_sorted[b])
                    b += 1
            merged.extend(left_sorted[a:])
            merged.extend(right_sorted[b:])
            middle = xs[order[half]]
            strip = [i for i in merged if abs(xs[i] - middle) < delta]
            for pos in range(len(strip)):
                follow = pos + 1
                while follow < len(strip) and ys[strip[follow]] - ys[strip[pos]] < delta:
                    gap = abs(xs[strip[pos]] - xs[strip[follow]]) + abs(ys[strip[pos]] - ys[strip[follow]])
                    delta = min(delta, gap)
                    follow += 1
            return delta, merged

        by_x = sorted(range(n), key=lambda i: (xs[i], ys[i]))
        dist, _ = solve(by_x)

        # With minimum distance d the points are pairwise >= d apart, so a
        # d-sided hash grid holds a bounded handful of points per cell;
        # every partner at distance exactly d sits in the 3x3 neighbourhood
        # and each edge surfaces exactly once, keeping the search linear.
        ans_j, ans_k = n, n
        cells = {}
        for i in range(n):
            cx = xs[i] // dist
            cy = ys[i] // dist
            base = (cx, cy)
            for gx in (cx - 1, cx, cx + 1):
                for gy in (cy - 1, cy, cy + 1):
                    bucket = cells.get((gx, gy))
                    if bucket:
                        for j in bucket:
                            gap = abs(xs[i] - xs[j]) + abs(ys[i] - ys[j])
                            if gap == dist and (j, i) < (ans_j, ans_k):
                                ans_j, ans_k = j, i
            cells.setdefault(base, []).append(i)
        return [ans_j, ans_k]
