class Solution:
    def addMinimum(self, word: str) -> int:
        # Two pointers over word and the repeating pattern "abc": every
        # aligned pattern slot the word fails to consume is a letter that
        # must be inserted there.
        answer = 0
        k = i = 0
        while k < len(word):
            if word[k] == "abc"[i % 3]:
                k += 1
            else:
                answer += 1
            i += 1
        # After the last consumed letter, finish off its cycle.
        return answer + (3 - i % 3) % 3
