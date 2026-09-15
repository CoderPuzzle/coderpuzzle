class Solution:
    def countValidWords(self, sentence: str) -> int:
        return sum(self._valid(token) for token in sentence.split())

    def _valid(self, token: str) -> bool:
        hyphens = 0
        punctuation = 0

        for index, character in enumerate(token):
            if "a" <= character <= "z":
                continue
            if character == "-":
                hyphens += 1
                if (
                    hyphens > 1
                    or index == 0
                    or index + 1 == len(token)
                    or not token[index - 1].islower()
                    or not token[index + 1].islower()
                ):
                    return False
            elif character in "!.,":
                punctuation += 1
                if punctuation > 1 or index + 1 != len(token):
                    return False
            else:
                return False

        return True
