class Solution:
    def strobogrammaticInRange(self, low: str, high: str) -> int:
        # Rotated-digit map: 0, 1 and 8 map to themselves, 6 and 9 swap. A
        # string is strobogrammatic exactly when it equals its image under
        # this map, read in reverse.
        rotated = {"0": "0", "1": "1", "8": "8", "6": "9", "9": "6"}

        def choices_at(position: int, length: int, half: int) -> str:
            # Digits a length-`length` string may place at half-position
            # `position`: the outermost digit cannot be 0 (no leading zeros
            # except "0" itself), and an odd length's exact middle must
            # self-rotate, which rules out 6 and 9 there.
            if position == 0 and length > 1:
                return "1689"
            if length % 2 == 1 and position == half - 1:
                return "018"
            return "01689"

        def total_of_length(length: int) -> int:
            # Closed form: a strobogrammatic string is decided by its first
            # half, so each free half-position multiplies the count.
            half = (length + 1) // 2
            total = 1
            for position in range(half - 1, -1, -1):
                total *= len(choices_at(position, length, half))
            return total

        def count_at_least(boundary: str) -> int:
            # Strobogrammatic strings of the boundary's own length that are
            # >= boundary. Each such candidate first differs from the
            # boundary at one half-position: choosing a larger digit there
            # settles the comparison, and the inner positions complete
            # freely, in ways[i] ways. Lexicographic order on equal-length
            # digit strings is numeric order, so plain string compare works.
            length = len(boundary)
            half = (length + 1) // 2
            ways = [1] * (half + 1)
            for position in range(half - 1, -1, -1):
                ways[position] = len(choices_at(position, length, half)) * ways[position + 1]
            count = 0
            for position in range(half):
                options = choices_at(position, length, half)
                digit = boundary[position]
                count += sum(option > digit for option in options) * ways[position + 1]
                if digit not in options:
                    return count
            # Every half-position matched, so the only surviving candidate
            # is the mirror completion of the boundary's own first half.
            first = boundary[:half]
            candidate = first + "".join(rotated[d] for d in reversed(first[: length - half]))
            return count + (candidate >= boundary)

        def is_strobogrammatic(value: str) -> bool:
            return all(rotated.get(a) == b for a, b in zip(value, reversed(value)))

        count = count_at_least(low)
        for length in range(len(low) + 1, len(high) + 1):
            count += total_of_length(length)
        # All lengths above len(low) contribute in full, including len(high)
        # itself; there the candidates above high are dropped. Subtracting
        # count_at_least(high) also drops high itself when it qualifies, so
        # put that one back.
        return count - count_at_least(high) + is_strobogrammatic(high)
