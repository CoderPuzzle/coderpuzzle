from typing import List


class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:
        # Sweep right to left: answer[i] is the max seen strictly right of i,
        # which the running maximum holds before arr[i] joins it.
        answer = [-1] * len(arr)
        running_max = -1
        for i in range(len(arr) - 1, -1, -1):
            answer[i] = running_max
            if arr[i] > running_max:
                running_max = arr[i]
        return answer
