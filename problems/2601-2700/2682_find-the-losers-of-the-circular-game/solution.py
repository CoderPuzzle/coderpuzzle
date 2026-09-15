from typing import List


class Solution:
    def circularGameLosers(self, n: int, k: int) -> List[int]:
        # Straight simulation: friend 1 holds the ball at the start, and each
        # turn i moves the holder i*k seats clockwise. At most n turns pass
        # before some friend receives the ball twice; i*k <= 2500 keeps every
        # value far below 32-bit bounds.
        received = [False] * n
        received[0] = True
        holder = 0
        turn = 1
        while True:
            holder = (holder + turn * k) % n
            if received[holder]:
                break
            received[holder] = True
            turn += 1
        return [friend + 1 for friend in range(n) if not received[friend]]
