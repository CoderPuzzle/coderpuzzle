from typing import List


class FileSystem:
    # The whole file system is one tree: a dict is a directory, a str value is
    # a file's accumulated content — files and subdirs share one namespace.

    def __init__(self) -> None:
        self.root = {}

    def ls(self, path: str) -> List[str]:
        parts = [part for part in path.split("/") if part]
        node = self.root
        for part in parts[:-1]:
            node = node[part]
        if not parts:
            return sorted(self.root)
        child = node[parts[-1]]
        # A directory lists its children's names; a file answers with itself.
        if isinstance(child, dict):
            return sorted(child)
        return [parts[-1]]

    def mkdir(self, path: str) -> None:
        node = self.root
        for part in path.split("/"):
            if part:
                # setdefault creates any missing component, middle dirs included.
                node = node.setdefault(part, {})

    def addContentToFile(self, filePath: str, content: str) -> None:
        parts = [part for part in filePath.split("/") if part]
        node = self.root
        for part in parts[:-1]:
            node = node[part]
        name = parts[-1]
        # Append to the existing buffer, creating the file on first write.
        if isinstance(node.get(name), str):
            node[name] += content
        else:
            node[name] = content

    def readContentFromFile(self, filePath: str) -> str:
        parts = [part for part in filePath.split("/") if part]
        node = self.root
        for part in parts[:-1]:
            node = node[part]
        return node[parts[-1]]
