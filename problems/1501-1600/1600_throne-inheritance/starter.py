from typing import List, Optional


class ThroneInheritance:
    def __init__(self, kingName: str):
        raise NotImplementedError("TODO")

    def birth(self, parentName: str, childName: str):
        raise NotImplementedError("TODO")

    def death(self, name: str):
        raise NotImplementedError("TODO")

    def getInheritanceOrder(self) -> List[str]:
        raise NotImplementedError("TODO")
