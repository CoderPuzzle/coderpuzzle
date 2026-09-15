class Solution:
    def getDistances(self, arr: list[int]) -> list[int]:
        answer = [0] * len(arr)
        counts = {}
        sums = {}
        for index, value in enumerate(arr):
            answer[index] += index * counts.get(value, 0) - sums.get(value, 0)
            counts[value] = counts.get(value, 0) + 1
            sums[value] = sums.get(value, 0) + index

        counts.clear()
        sums.clear()
        for index in range(len(arr) - 1, -1, -1):
            value = arr[index]
            answer[index] += sums.get(value, 0) - index * counts.get(value, 0)
            counts[value] = counts.get(value, 0) + 1
            sums[value] = sums.get(value, 0) + index
        return answer
