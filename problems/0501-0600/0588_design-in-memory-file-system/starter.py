from typing import List, Optional


class FileSystem:
    def __init__(self):
        raise NotImplementedError("TODO")

    def ls(self, path: str) -> List[str]:
        raise NotImplementedError("TODO")

    def mkdir(self, path: str):
        raise NotImplementedError("TODO")

    def addContentToFile(self, filePath: str, content: str):
        raise NotImplementedError("TODO")

    def readContentFromFile(self, filePath: str) -> str:
        raise NotImplementedError("TODO")
