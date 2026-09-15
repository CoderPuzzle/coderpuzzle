from typing import List


class SegmentTree:
    def __init__(self, n: int):
        self.size = 1
        while self.size < n + 1:
            self.size *= 2
        self.inf = n + 1
        self.count = [0] * (2 * self.size)
        self.minimum = [self.inf] * (2 * self.size)

    def update(self, position: int, active: bool, mth: int = 0) -> None:
        node = self.size + position
        self.count[node] = 1 if active else 0
        self.minimum[node] = mth if active else self.inf
        node //= 2
        while node:
            self.count[node] = self.count[2 * node] + self.count[2 * node + 1]
            self.minimum[node] = min(self.minimum[2 * node], self.minimum[2 * node + 1])
            node //= 2

    def kth_latest(self, need: int) -> int:
        node = 1
        while node < self.size:
            right = 2 * node + 1
            if self.count[right] >= need:
                node = right
            else:
                need -= self.count[right]
                node = right - 1
        return node - self.size

    def range_minimum(self, left: int, right: int) -> int:
        left += self.size
        right += self.size
        result = self.inf
        while left <= right:
            if left & 1:
                result = min(result, self.minimum[left])
                left += 1
            if not (right & 1):
                result = min(result, self.minimum[right])
                right -= 1
            left //= 2
            right //= 2
        return result


class Solution:
    def countSubarrays(self, nums: List[int], k: int, m: int) -> int:
        n = len(nums)
        tree = SegmentTree(n)
        history = {}
        answer = 0

        for right, value in enumerate(nums, 1):
            places = history.setdefault(value, [])
            if places:
                tree.update(places[-1], False)
            places.append(right)
            mth = places[-m] if len(places) >= m else 0
            tree.update(right, True, mth)

            if tree.count[1] < k:
                continue
            last_k = tree.kth_latest(k)
            last_next = tree.kth_latest(k + 1) if tree.count[1] > k else 0
            min_mth = tree.range_minimum(last_k, n)
            answer += max(0, min(last_k, min_mth) - last_next)

        return answer
