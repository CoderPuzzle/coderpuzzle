from typing import List, Optional


class TextEditor:
    def __init__(self):
        raise NotImplementedError("TODO")

    def addText(self, text: str):
        raise NotImplementedError("TODO")

    def deleteText(self, k: int) -> int:
        raise NotImplementedError("TODO")

    def cursorLeft(self, k: int) -> str:
        raise NotImplementedError("TODO")

    def cursorRight(self, k: int) -> str:
        raise NotImplementedError("TODO")
