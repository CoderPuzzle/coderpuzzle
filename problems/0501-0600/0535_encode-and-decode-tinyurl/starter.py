from typing import List, Optional


class Codec:
    def __init__(self):
        raise NotImplementedError("TODO")

    def encode(self, longUrl: str) -> str:
        raise NotImplementedError("TODO")

    def decode(self, shortUrl: str) -> str:
        raise NotImplementedError("TODO")
