from typing import List, Optional


class Codec:
    def __init__(self):
        raise NotImplementedError("TODO")

    def encode(self, strs: List[str]) -> str:
        raise NotImplementedError("TODO")

    def decode(self, s: str) -> List[str]:
        raise NotImplementedError("TODO")
