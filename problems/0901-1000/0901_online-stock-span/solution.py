from typing import List, Tuple


class StockSpanner:
    """Monotonic stack of (price, span) with strictly decreasing prices.

    Each day absorbs the spans of the popped entries (prices <= today's), so
    every price is pushed and popped at most once across the whole stream.
    """

    def __init__(self) -> None:
        self.stack: List[Tuple[int, int]] = []

    def next(self, price: int) -> int:
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append((price, span))
        return span
