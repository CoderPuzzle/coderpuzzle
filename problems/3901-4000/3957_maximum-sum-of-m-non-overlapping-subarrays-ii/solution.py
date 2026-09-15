from typing import List


class Solution:
    def maximumSum(self, nums: List[int], m: int, l: int, r: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, value in enumerate(nums, 1):
            prefix[i] = prefix[i - 1] + value

        def evaluate(penalty: int) -> tuple[int, int]:
            values = [0] * (n + 1)
            counts = [0] * (n + 1)
            queue = [0] * (n + 1)
            head = 0
            tail = 0

            for end in range(1, n + 1):
                start = end - l
                if start >= 0:
                    key = values[start] - prefix[start]
                    while tail > head:
                        back = queue[tail - 1]
                        back_key = values[back] - prefix[back]
                        if back_key > key or (back_key == key and counts[back] > counts[start]):
                            break
                        tail -= 1
                    queue[tail] = start
                    tail += 1

                while head < tail and queue[head] < end - r:
                    head += 1

                values[end] = values[end - 1]
                counts[end] = counts[end - 1]
                if head < tail:
                    start = queue[head]
                    take_value = prefix[end] - penalty + values[start] - prefix[start]
                    take_count = counts[start] + 1
                    if take_value > values[end] or (take_value == values[end] and take_count > counts[end]):
                        values[end] = take_value
                        counts[end] = take_count
            return values[n], counts[n]

        value, count = evaluate(0)
        if count == 0:
            queue = [0] * (n + 1)
            head = 0
            tail = 0
            best = -(10**30)
            for end in range(1, n + 1):
                start = end - l
                if start >= 0:
                    while tail > head and prefix[queue[tail - 1]] >= prefix[start]:
                        tail -= 1
                    queue[tail] = start
                    tail += 1
                while head < tail and queue[head] < end - r:
                    head += 1
                if head < tail:
                    best = max(best, prefix[end] - prefix[queue[head]])
            return best

        if count <= m:
            return value

        low_penalty = 0
        high_penalty = n * max(abs(value) for value in nums) + 1
        while low_penalty < high_penalty:
            penalty = (low_penalty + high_penalty + 1) // 2
            if evaluate(penalty)[1] >= m:
                low_penalty = penalty
            else:
                high_penalty = penalty - 1
        return evaluate(low_penalty)[0] + low_penalty * m
