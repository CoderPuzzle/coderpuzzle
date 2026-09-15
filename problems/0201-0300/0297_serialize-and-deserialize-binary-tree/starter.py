from typing import List, Optional


class Codec:
    def __init__(self):
        raise NotImplementedError("TODO")

    def serialize(self, root: Optional[TreeNode]) -> str:
        raise NotImplementedError("TODO")

    def deserialize(self, data: str) -> Optional[TreeNode]:
        raise NotImplementedError("TODO")
