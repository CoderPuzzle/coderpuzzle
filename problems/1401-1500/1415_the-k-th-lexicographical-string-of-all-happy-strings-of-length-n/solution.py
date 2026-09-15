class Solution:
    def getHappyString(self, n: int, k: int) -> str:
        total = 3 * (1 << (n - 1))
        if k > total:
            return ""
        letters = "abc"
        result = []
        block = total // 3
        k -= 1  # 0-indexed rank inside the whole list
        for i in range(n):
            if i == 0:
                candidates = letters
            else:
                previous = result[-1]
                candidates = [c for c in letters if c != previous]
            index, k = divmod(k, block)
            result.append(candidates[index])
            block //= 2
        return "".join(result)
