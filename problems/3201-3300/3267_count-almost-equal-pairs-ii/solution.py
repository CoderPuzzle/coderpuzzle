from typing import List


class Solution:
    def countPairs(self, nums: List[int]) -> int:
        # Splitting the two operations between the numbers never helps: the
        # minimum number of digit swaps turning one padded string into
        # another obeys the triangle inequality, so x and y are almost
        # equal exactly when y is reachable from x by <= 2 swaps of x's own
        # digits, compared with leading zeros padded to the longer length
        # (that is how 1023 becomes 0213 = 213 and 1 meets 100).
        #
        # Pad every number to the widest width w (<= 7), enumerate all
        # values reachable by 0, 1, or 2 swaps (at most 1 + C(w,2) +
        # C(w,2)^2 deduplicated states), and sweep left to right: add the
        # frequencies of already-seen numbers found in the reachable set,
        # then record the current number. Each pair is counted once, via
        # the later element querying the earlier one's actual value.
        w = len(str(max(nums)))
        pairs = [(i, j) for i in range(w) for j in range(i + 1, w)]
        ans = 0
        seen = {}
        for x in nums:
            d = list(str(x).zfill(w))
            states = {int("".join(d))}
            for i, j in pairs:
                d[i], d[j] = d[j], d[i]
                states.add(int("".join(d)))
                for k, l in pairs:
                    d[k], d[l] = d[l], d[k]
                    states.add(int("".join(d)))
                    d[k], d[l] = d[l], d[k]
                d[i], d[j] = d[j], d[i]
            for v in states:
                ans += seen.get(v, 0)
            seen[x] = seen.get(x, 0) + 1
        return ans
