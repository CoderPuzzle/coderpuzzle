from typing import List, Optional


class BrowserHistory:
    def __init__(self, homepage: str):
        raise NotImplementedError("TODO")

    def visit(self, url: str):
        raise NotImplementedError("TODO")

    def back(self, steps: int) -> str:
        raise NotImplementedError("TODO")

    def forward(self, steps: int) -> str:
        raise NotImplementedError("TODO")
