class Solution:
    def complexNumberMultiply(self, num1: str, num2: str) -> str:
        # Parse: drop the trailing 'i', then split at the LAST '+' — the
        # imaginary part may itself be negative, but the real part never
        # carries a '+', so that final '+' is the one true seam.
        def parts(num):
            head, _, tail = num[:-1].rpartition("+")
            return int(head), int(tail)

        a, b = parts(num1)
        c, d = parts(num2)
        # Multiply: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.
        real = a * c - b * d
        imag = a * d + b * c
        # Render: the output mirrors the input format, so the '+' is literal
        # — a negative imaginary part stays "0+-2i", never folded to "0-2i".
        return str(real) + "+" + str(imag) + "i"
