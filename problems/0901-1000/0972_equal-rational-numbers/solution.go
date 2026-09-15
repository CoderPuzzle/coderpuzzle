import (
	"strconv"
	"strings"
)

// Two notations name the same number exactly when their exact rational
// values coincide. Parse each string into an integer part plus an exact
// fraction: with a repeating part, the fractional value is
// (int(nonrep + rep) - int(nonrep)) over 10^len(nonrep) * (10^len(rep) - 1);
// without one, int(nonrep) over 10^len(nonrep). A numerator equal to the
// denominator is the all-trailing-9s carry — 0.9(9) is exactly 1 — so it
// rolls into the integer part. Parts are at most four digits, so numerator
// and denominator stay below 10^8 and every cross product below 10^16, two
// orders inside an int64.
func isRationalEqual(s string, t string) bool {
	wholeS, numS, denS := fraction(s)
	wholeT, numT, denT := fraction(t)
	return wholeS == wholeT && numS*denT == numT*denS
}

// The value of one notation as whole, numerator, denominator, with the
// trailing-9s carry already folded into the whole part.
func fraction(x string) (int64, int64, int64) {
	integer, rest := x, ""
	if dot := strings.IndexByte(x, '.'); dot >= 0 {
		integer, rest = x[:dot], x[dot+1:]
	}
	nonRep, rep := rest, ""
	if open := strings.IndexByte(rest, '('); open >= 0 {
		nonRep, rep = rest[:open], rest[open+1:len(rest)-1]
	}
	base := pow10(len(nonRep))
	var numerator, denominator int64
	if rep == "" {
		numerator, denominator = digits(nonRep), base
	} else {
		numerator, denominator = digits(nonRep+rep)-digits(nonRep), base*(pow10(len(rep))-1)
	}
	whole := digits(integer)
	if numerator == denominator { // 0.9(9) carries into the whole part
		whole++
		numerator, denominator = 0, 1
	}
	return whole, numerator, denominator
}

func digits(s string) int64 {
	if s == "" {
		return 0
	}
	value, _ := strconv.ParseInt(s, 10, 64)
	return value
}

func pow10(exponent int) int64 {
	value := int64(1)
	for i := 0; i < exponent; i++ {
		value *= 10
	}
	return value
}
