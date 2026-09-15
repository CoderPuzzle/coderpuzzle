class Solution:
    def kthCharacter(self, k: int, operations: list[int]) -> str:
        # The final word can span 2**100 characters, so it is never built.
        # Replay backwards from k: operation i (which doubles the length from
        # 2**i to 2**(i+1)) only touches the position when k sits in its
        # appended half (k > 2**i), in which case the character is a copy of
        # the one at k - 2**i -- shifted once more if the type is 1. Every
        # qualifying type-1 operation advances the letter cyclically by one
        # past 'z', and starting from "a" the answer is that accumulated
        # shift mod 26.
        shifts = 0
        position = k
        for index in range(len(operations) - 1, -1, -1):
            half = 1 << index
            if position > half:
                position -= half
                if operations[index] == 1:
                    shifts += 1
        return chr(ord("a") + shifts % 26)
