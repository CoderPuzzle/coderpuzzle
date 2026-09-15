class Solution {

    public String complexNumberMultiply(String num1, String num2) {
        // Parse: drop the trailing 'i', then split at the LAST '+' — the
        // imaginary part may itself be negative, but the real part never
        // carries a '+', so that final '+' is the one true seam.
        int[] p = parts(num1);
        int[] q = parts(num2);
        int a = p[0],
            b = p[1],
            c = q[0],
            d = q[1];
        // Multiply: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.
        int real = a * c - b * d;
        int imag = a * d + b * c;
        // Render: the output mirrors the input format, so the '+' is literal
        // — a negative imaginary part stays "0+-2i", never folded to "0-2i".
        return real + "+" + imag + "i";
    }

    private int[] parts(String num) {
        String body = num.substring(0, num.length() - 1);
        int seam = body.lastIndexOf('+');
        return new int[] { Integer.parseInt(body.substring(0, seam)), Integer.parseInt(body.substring(seam + 1)) };
    }
}
