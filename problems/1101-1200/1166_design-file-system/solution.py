class FileSystem:
    """One map from full path strings to values; structure lives in the keys."""

    def __init__(self) -> None:
        self.values: dict[str, int] = {}

    def createPath(self, path: str, value: int) -> bool:
        # Reject a repeat; then the parent is everything before the last
        # slash. An empty slice means the path hangs off the root directly.
        if path in self.values:
            return False
        parent = path[: path.rfind("/")]
        if parent and parent not in self.values:
            return False
        self.values[path] = value
        return True

    def get(self, path: str) -> int:
        return self.values.get(path, -1)
