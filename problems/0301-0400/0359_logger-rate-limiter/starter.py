from typing import List, Optional


class Logger:
    def __init__(self):
        raise NotImplementedError("TODO")

    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:
        raise NotImplementedError("TODO")
