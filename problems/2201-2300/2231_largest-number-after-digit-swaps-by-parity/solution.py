class Solution:
    def largestInteger(self, num: int) -> int:
        digits = str(num)
        odds = sorted((ch for ch in digits if int(ch) % 2 == 1), reverse=True)
        evens = sorted((ch for ch in digits if int(ch) % 2 == 0), reverse=True)
        result = []
        for ch in digits:
            if int(ch) % 2 == 1:
                result.append(odds.pop(0))
            else:
                result.append(evens.pop(0))
        return int("".join(result))
