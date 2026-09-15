from typing import List


class Solution:
    def movesToChessboard(self, board: List[List[int]]) -> int:
        # Row and column swaps preserve the XOR of any rectangle's four
        # corners, and that XOR is 0 on every chessboard, so a solvable
        # board must repeat one row (or its complement) everywhere.
        n = len(board)
        for i in range(n):
            for j in range(n):
                if board[0][0] ^ board[0][j] ^ board[i][0] ^ board[i][j]:
                    return -1
        # The first row and first column must each be rearrangeable into an
        # alternating pattern, so both need n/2 (or (n+1)/2) ones.
        half = n // 2
        ceil_half = (n + 1) // 2
        row_ones = sum(board[0])
        col_ones = sum(board[i][0] for i in range(n))
        if row_ones not in (half, ceil_half) or col_ones not in (half, ceil_half):
            return -1
        # Count rows/columns already sitting where the pattern starting
        # with 0 wants them; each swap corrects two misplaced ones.
        row_matches = sum(1 for i in range(n) if board[i][0] == i % 2)
        col_matches = sum(1 for i in range(n) if board[0][i] == i % 2)
        if n % 2 == 0:
            # Both alternating patterns are available; either way to pair
            # the misplaced entries is fair game, so take the cheaper.
            row_swaps = min(row_matches, n - row_matches)
            col_swaps = min(col_matches, n - col_matches)
        else:
            # Odd n pins the pattern by its majority value, and the true
            # mismatch count is the even member of each pair.
            row_swaps = row_matches if row_matches % 2 == 0 else n - row_matches
            col_swaps = col_matches if col_matches % 2 == 0 else n - col_matches
        return (row_swaps + col_swaps) // 2
