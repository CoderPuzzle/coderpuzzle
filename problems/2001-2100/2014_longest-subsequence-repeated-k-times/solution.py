class Solution:
    def longestSubsequenceRepeatedK(self, s: str, k: int) -> str:
        quotas = [0] * 26
        for char in s:
            quotas[ord(char) - ord("a")] += 1
        quotas = [count // k for count in quotas]
        best = ""

        def repeated(candidate: str) -> bool:
            matched = 0
            completed = 0
            for char in s:
                if char == candidate[matched]:
                    matched += 1
                    if matched == len(candidate):
                        completed += 1
                        if completed == k:
                            return True
                        matched = 0
            return False

        def search(candidate: str) -> None:
            nonlocal best
            if len(candidate) > len(best) or (len(candidate) == len(best) and candidate > best):
                best = candidate

            for index in range(25, -1, -1):
                if quotas[index] == 0:
                    continue
                quotas[index] -= 1
                extended = candidate + chr(ord("a") + index)
                if repeated(extended):
                    search(extended)
                quotas[index] += 1

        search("")
        return best
