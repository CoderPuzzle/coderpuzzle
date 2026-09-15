// The output mirrors the input format, so parsing and rendering are half the
// problem: both sides of the multiplication travel as "real+imaginaryi" with
// the imaginary part's sign included in its own digits.
function complexNumberMultiply(num1: string, num2: string): string {
    // Parse: drop the trailing 'i', then split at the LAST '+' — the
    // imaginary part may itself be negative, but the real part never
    // carries a '+', so that final '+' is the one true seam.
    const parts = (num: string): [number, number] => {
        const body = num.slice(0, -1);
        const seam = body.lastIndexOf("+");
        return [Number(body.slice(0, seam)), Number(body.slice(seam + 1))];
    };

    const [a, b] = parts(num1);
    const [c, d] = parts(num2);
    // Multiply: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.
    const real = a * c - b * d;
    const imag = a * d + b * c;
    // Render: the '+' is literal, so a negative imaginary part stays
    // "0+-2i", never folded to "0-2i".
    return `${real}+${imag}i`;
}
