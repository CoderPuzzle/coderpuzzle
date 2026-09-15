class Solution:
    def flowerGame(self, n: int, m: int) -> int:
        # Each turn removes exactly one flower, so a game started with x + y
        # flowers always lasts exactly x + y turns, and the mover of that
        # final turn empties the field and captures the opponent. Alice
        # moves on odd-numbered turns, so she wins exactly when x + y is
        # odd. Counting odd-sum pairs: odd x against even y plus even x
        # against odd y, where [1, k] holds ceil(k / 2) odds and
        # floor(k / 2) evens. At n = m = 10^5 the answer reaches 5 * 10^9,
        # which is why fixed-width languages accumulate in 64 bits.
        return ((n + 1) // 2) * (m // 2) + (n // 2) * ((m + 1) // 2)
