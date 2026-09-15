import (
	"fmt"
	"strconv"
	"strings"
)

// The output mirrors the input format, so parsing and rendering are half the
// problem: both sides of the multiplication travel as "real+imaginaryi" with
// the imaginary part's sign included in its own digits.
func complexNumberMultiply(num1 string, num2 string) string {
	// Parse: drop the trailing 'i', then split at the LAST '+' — the
	// imaginary part may itself be negative, but the real part never
	// carries a '+', so that final '+' is the one true seam.
	a, b := parts(num1)
	c, d := parts(num2)
	// Multiply: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.
	real := a*c - b*d
	imag := a*d + b*c
	// Render: the '+' is literal, so a negative imaginary part stays
	// "0+-2i", never folded to "0-2i".
	return fmt.Sprintf("%d+%di", real, imag)
}

func parts(num string) (int, int) {
	body := num[:len(num)-1]
	seam := strings.LastIndexByte(body, '+')
	real, _ := strconv.Atoi(body[:seam])
	imag, _ := strconv.Atoi(body[seam+1:])
	return real, imag
}
