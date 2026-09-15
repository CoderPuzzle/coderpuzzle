from bisect import bisect_left


class Solution:
    def maxSum(self, nums: list[int], k: int) -> int:
        n = len(nums)
        vals = sorted(set(nums))
        m = len(vals)
        pos = [bisect_left(vals, x) for x in nums]
        full_sum = sum(nums)

        # Two Fenwick trees over value ranks track (count, sum) of the
        # elements inside and outside the current window. The walks are
        # inlined and the (count, sum) pairs are fused into single descents,
        # which keeps the O(n^2 log n) sweep fast in CPython.
        in_count = [0] * (m + 1)
        in_sum = [0] * (m + 1)
        out_count = [0] * (m + 1)
        out_sum = [0] * (m + 1)
        for p, x in zip(pos, nums):
            i = p + 1
            while i <= m:
                out_count[i] += 1
                out_sum[i] += x
                i += i & -i

        step = 1 << (m.bit_length() - 1)
        best = -(1 << 62)

        for l in range(n):
            # move nums[l] in and open the window [l, l]
            head = nums[l]
            i = pos[l] + 1
            while i <= m:
                out_count[i] -= 1
                out_sum[i] -= head
                in_count[i] += 1
                in_sum[i] += head
                i += i & -i
            total = head
            swaps = 0
            if total > best:
                best = total

            for r in range(l + 1, n):
                x = nums[r]
                i = pos[r] + 1
                while i <= m:
                    out_count[i] -= 1
                    out_sum[i] -= x
                    in_count[i] += 1
                    in_sum[i] += x
                    i += i & -i
                total += x

                window = r - l + 1
                outside = n - window
                limit = k
                if window < limit:
                    limit = window
                if outside < limit:
                    limit = outside

                # maintain the largest profitable swap count: swap t is
                # profitable while the t-th largest outside value beats the
                # t-th smallest inside value
                while swaps > limit:
                    swaps -= 1
                if swaps > 0:
                    kk = outside - swaps + 1
                    a = 0
                    z = step
                    while z:
                        j = a + z
                        if j <= m and out_count[j] < kk:
                            kk -= out_count[j]
                            a = j
                        z >>= 1
                    kk = swaps
                    b = 0
                    z = step
                    while z:
                        j = b + z
                        if j <= m and in_count[j] < kk:
                            kk -= in_count[j]
                            b = j
                        z >>= 1
                    while vals[a] <= vals[b]:
                        swaps -= 1
                        if swaps == 0:
                            break
                        kk = outside - swaps + 1
                        a = 0
                        z = step
                        while z:
                            j = a + z
                            if j <= m and out_count[j] < kk:
                                kk -= out_count[j]
                                a = j
                            z >>= 1
                        kk = swaps
                        b = 0
                        z = step
                        while z:
                            j = b + z
                            if j <= m and in_count[j] < kk:
                                kk -= in_count[j]
                                b = j
                            z >>= 1
                while swaps < limit:
                    kk = outside - swaps
                    a = 0
                    z = step
                    while z:
                        j = a + z
                        if j <= m and out_count[j] < kk:
                            kk -= out_count[j]
                            a = j
                        z >>= 1
                    kk = swaps + 1
                    b = 0
                    z = step
                    while z:
                        j = b + z
                        if j <= m and in_count[j] < kk:
                            kk -= in_count[j]
                            b = j
                        z >>= 1
                    if vals[a] <= vals[b]:
                        break
                    swaps += 1

                value = total
                if swaps:
                    # gain = all outside sum - (outside sum without its top
                    # `swaps` values) - inside sum of its `swaps` smallest;
                    # the kth descents accumulate prefix (count, sum) so each
                    # query is one walk
                    kk = outside - swaps
                    a = 0
                    acc_s = 0
                    z = step
                    while z:
                        j = a + z
                        if j <= m and out_count[j] < kk:
                            kk -= out_count[j]
                            acc_s += out_sum[j]
                            a = j
                        z >>= 1
                    top_out = full_sum - total - acc_s - kk * vals[a]
                    kk = swaps
                    b = 0
                    acc_s = 0
                    z = step
                    while z:
                        j = b + z
                        if j <= m and in_count[j] < kk:
                            kk -= in_count[j]
                            acc_s += in_sum[j]
                            b = j
                        z >>= 1
                    value += top_out - (acc_s + kk * vals[b])
                if value > best:
                    best = value

            # close the window: return every element to the outside tree so
            # the next left endpoint starts from the full multiset again
            for r in range(l, n):
                y = nums[r]
                i = pos[r] + 1
                while i <= m:
                    in_count[i] -= 1
                    in_sum[i] -= y
                    out_count[i] += 1
                    out_sum[i] += y
                    i += i & -i

        return best
