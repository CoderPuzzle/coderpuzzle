from typing import List, Optional


class Encrypter:
    def __init__(self, keys: List[str], values: List[str], dictionary: List[str]):
        raise NotImplementedError("TODO")

    def encrypt(self, word1: str) -> str:
        raise NotImplementedError("TODO")

    def decrypt(self, word2: str) -> int:
        raise NotImplementedError("TODO")
