from typing import List, Optional


class PhoneDirectory:
    def __init__(self, maxNumbers: int):
        raise NotImplementedError("TODO")

    def get(self) -> int:
        raise NotImplementedError("TODO")

    def check(self, number: int) -> bool:
        raise NotImplementedError("TODO")

    def release(self, number: int):
        raise NotImplementedError("TODO")
