class Solution:
    def convertNumber(self, s: str) -> str:
        # Trie over the ten digit words: nested dicts keyed by letter, with
        # "$" marking a node where a word ends. No word is a prefix of
        # another, so a walk from any position crosses at most one terminal,
        # and the first terminal reached is exactly where the word ends.
        root = {}
        for word, digit in (
            ("zero", "0"),
            ("one", "1"),
            ("two", "2"),
            ("three", "3"),
            ("four", "4"),
            ("five", "5"),
            ("six", "6"),
            ("seven", "7"),
            ("eight", "8"),
            ("nine", "9"),
        ):
            node = root
            for ch in word:
                node = node.setdefault(ch, {})
            node["$"] = digit
        digits = []
        i, n = 0, len(s)
        while i < n:
            node = root
            j = i
            hit = None
            while j < n and s[j] in node:
                node = node[s[j]]
                j += 1
                if "$" in node:
                    hit = (node["$"], j)
                    break
            if hit is None:
                i += 1
            else:
                digits.append(hit[0])
                i = hit[1]
        return "".join(digits)
