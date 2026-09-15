class Solution:
    def decodeCiphertext(self, encodedText: str, rows: int) -> str:
        if not encodedText:
            return ""
        cols = len(encodedText) // rows
        decoded = []
        for start in range(cols):
            row = 0
            col = start
            while row < rows and col < cols:
                decoded.append(encodedText[row * cols + col])
                row += 1
                col += 1
        return "".join(decoded).rstrip(" ")
