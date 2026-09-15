from typing import Dict, List, Optional


class Encrypter:
    """Forward map for encryption; for decryption, dictionary words are
    pre-encrypted once and counted in a bag, so each decrypt call is one
    hash lookup — the count of dictionary strings whose encryption equals
    word2 equals the number of ways word2 decrypts into the dictionary.
    """

    def __init__(self, keys: List[str], values: List[str], dictionary: List[str]):
        self.forward = dict(zip(keys, values))
        self.enc_counts: Dict[str, int] = {}
        for word in dictionary:
            encrypted = self.encrypt(word)
            if encrypted:
                self.enc_counts[encrypted] = self.enc_counts.get(encrypted, 0) + 1

    def encrypt(self, word1: str) -> str:
        pieces = []
        for ch in word1:
            mapped = self.forward.get(ch)
            if mapped is None:
                return ""
            pieces.append(mapped)
        return "".join(pieces)

    def decrypt(self, word2: str) -> int:
        return self.enc_counts.get(word2, 0)


# Your Encrypter object will be instantiated and called as such:
# obj = Encrypter(keys, values, dictionary)
# param_1 = obj.encrypt(word1)
# param_2 = obj.decrypt(word2)
