from typing import List, Optional


class AuthenticationManager:
    def __init__(self, timeToLive: int):
        raise NotImplementedError("TODO")

    def generate(self, tokenId: str, currentTime: int):
        raise NotImplementedError("TODO")

    def renew(self, tokenId: str, currentTime: int):
        raise NotImplementedError("TODO")

    def countUnexpiredTokens(self, currentTime: int) -> int:
        raise NotImplementedError("TODO")
