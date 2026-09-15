from typing import List


class Solution:
    def applySubstitutions(self, replacements: List[List[str]], text: str) -> str:
        # The replacements form a DAG on keys: expand(key) renders its raw
        # value, recursing into each %X% reference exactly once via the memo.
        raw = {key: value for key, value in replacements}
        done = {}

        def expand(key: str) -> str:
            if key in done:
                return done[key]
            # %K% placeholders are three characters wide (single-letter
            # keys), so one linear scan splits value into literals and refs.
            value = raw[key]
            parts = []
            i = 0
            while i < len(value):
                if value[i] == "%":
                    parts.append(expand(value[i + 1]))
                    i += 3
                else:
                    parts.append(value[i])
                    i += 1
            done[key] = "".join(parts)
            return done[key]

        parts = []
        i = 0
        while i < len(text):
            if text[i] == "%":
                parts.append(expand(text[i + 1]))
                i += 3
            else:
                parts.append(text[i])
                i += 1
        return "".join(parts)
