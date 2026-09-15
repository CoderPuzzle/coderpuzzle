class Solution:
    def equalCountSubstrings(self, s: str, count: int) -> int:
        answer = 0
        for distinct in range(1, 27):
            window_length = distinct * count
            if window_length > len(s):
                break
            frequencies = [0] * 26
            present = 0
            exact = 0

            for right, character in enumerate(s):
                index = ord(character) - ord("a")
                if frequencies[index] == 0:
                    present += 1
                if frequencies[index] == count:
                    exact -= 1
                frequencies[index] += 1
                if frequencies[index] == count:
                    exact += 1

                if right >= window_length:
                    index = ord(s[right - window_length]) - ord("a")
                    if frequencies[index] == count:
                        exact -= 1
                    frequencies[index] -= 1
                    if frequencies[index] == count:
                        exact += 1
                    if frequencies[index] == 0:
                        present -= 1

                if right + 1 >= window_length and present == distinct and exact == distinct:
                    answer += 1
        return answer
