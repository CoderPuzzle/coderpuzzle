func sumAndMultiply(n int) int64 {
	// One pass peels n's digits least-significant first: each nonzero
	// digit joins the packed value x at the place slot it earns and joins
	// the digit sum; zeros fall through untouched, so x ends up holding
	// the surviving digits in their original order. The int64 return
	// carries products up to 999999999 * 81, past int32 range.
	x := int64(0)
	place := int64(1)
	total := int64(0)
	for m := n; m > 0; m /= 10 {
		if digit := int64(m % 10); digit != 0 {
			x += digit * place
			place *= 10
			total += digit
		}
	}
	return x * total
}
