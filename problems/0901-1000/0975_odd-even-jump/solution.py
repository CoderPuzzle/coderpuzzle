from typing import List


class Solution:
    def oddEvenJumps(self, arr: List[int]) -> int:
        # The jump out of every index is forced: an odd jump lands on the
        # smallest value >= arr[i] to the right, an even jump on the largest
        # value <= arr[i], and ties go to the smallest index. Build both
        # jump tables with one sort and one stack each: walk the indices
        # ordered by (value, index) — by (negated value, index) for the
        # even table — and each newcomer resolves every still-open index
        # standing to its left, because the first walker with a larger
        # original index is exactly the forced target. Then sweep from the
        # right: odd_ok[i] holds when the odd target's even_ok holds,
        # even_ok[i] when the even target's odd_ok holds, the last index is
        # good under both with zero jumps, and the answer counts the
        # odd_ok starts — every good start opens with an odd jump.
        n = len(arr)

        def jump_table(order):
            # Stack of indices still waiting for their forced target; the
            # first walker standing further right resolves each of them.
            table = [-1] * n
            stack = []
            for j in order:
                while stack and stack[-1] < j:
                    table[stack.pop()] = j
                stack.append(j)
            return table

        higher = jump_table(sorted(range(n), key=lambda i: (arr[i], i)))
        lower = jump_table(sorted(range(n), key=lambda i: (-arr[i], i)))
        odd_ok = [False] * n
        even_ok = [False] * n
        odd_ok[n - 1] = even_ok[n - 1] = True
        count = 1
        for i in range(n - 2, -1, -1):
            j = higher[i]
            if j != -1 and even_ok[j]:
                odd_ok[i] = True
            j = lower[i]
            if j != -1 and odd_ok[j]:
                even_ok[i] = True
            count += odd_ok[i]
        return count
