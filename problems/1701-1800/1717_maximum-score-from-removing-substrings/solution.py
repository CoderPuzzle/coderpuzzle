from typing import List, Optional


class Solution:
    def maximumGain(self, s: str, x: int, y: int) -> int:
        def remove_pairs(text, first, second, points):
            # Stack scan: `second` arriving on a top of `first` pops and
            # scores; everything else is pushed. Survivors are the text with
            # every non-overlapping removal of this pattern applied.
            stack = []
            score = 0
            for c in text:
                if stack and stack[-1] == first and c == second:
                    stack.pop()
                    score += points
                else:
                    stack.append(c)
            # The residue — including non-a/b characters, which never pair —
            # is exactly what the other pattern's pass sweeps next.
            return "".join(stack), score

        # Remove the higher-priced pattern first: by exchange, the character
        # left behind still pairs with the other kind, so this never loses.
        if x >= y:
            rest, score1 = remove_pairs(s, "a", "b", x)
            _, score2 = remove_pairs(rest, "b", "a", y)
        else:
            rest, score1 = remove_pairs(s, "b", "a", y)
            _, score2 = remove_pairs(rest, "a", "b", x)
        return score1 + score2
