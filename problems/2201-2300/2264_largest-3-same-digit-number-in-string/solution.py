class Solution:
    def largestGoodInteger(self, num: str) -> str:
        best = ""
        run = 1
        for i in range(1, len(num)):
            if num[i] == num[i - 1]:
                run += 1
            else:
                run = 1
            if run == 3 and num[i] * 3 > best:
                best = num[i] * 3
        return best
