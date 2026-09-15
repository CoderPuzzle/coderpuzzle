func countTime(time string) int {
	// Count the valid hours and the valid minutes independently; the two
	// fields never constrain each other, so the answer is their product.
	// A field with no ? has exactly one value if it is itself in range,
	// which the given format guarantees.
	hTens, hOnes := time[0], time[1]
	mTens, mOnes := time[3], time[4]

	hours := 0
	for h := 0; h < 24; h++ {
		if (hTens == '?' || h/10 == int(hTens-'0')) &&
			(hOnes == '?' || h%10 == int(hOnes-'0')) {
			hours++
		}
	}

	minutes := 0
	for m := 0; m < 60; m++ {
		if (mTens == '?' || m/10 == int(mTens-'0')) &&
			(mOnes == '?' || m%10 == int(mOnes-'0')) {
			minutes++
		}
	}

	return hours * minutes
}
