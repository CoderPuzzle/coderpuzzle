func totalWaviness(num1 int64, num2 int64) int64 {
	// f(N) = total waviness of 1..N; the answer telescopes to
	// f(num2) - f(num1 - 1). Two parallel tables track live prefixes by
	// (started, last digit, second-last digit): "tight" prefixes still
	// equal to N's prefix and "free" prefixes already below it. Digit 10
	// stands for "no digit yet". Everything accumulates in int64: the
	// largest achievable answer is f(10^15) ~ 7.4e15.
	return f(num2) - f(num1-1)
}

func blank3753() [2][11][11]int64 {
	return [2][11][11]int64{}
}

func f(n int64) int64 {
	if n <= 0 {
		return 0
	}
	var digits [16]int
	length := 0
	for m := n; m > 0; m /= 10 {
		digits[length] = int(m % 10)
		length++
	}
	for i, j := 0, length-1; i < j; i, j = i+1, j-1 {
		digits[i], digits[j] = digits[j], digits[i]
	}
	const none = 10

	tightCnt := blank3753()
	tightWav := blank3753()
	freeCnt := blank3753()
	freeWav := blank3753()
	tightCnt[0][none][none] = 1
	for pos := 0; pos < length; pos++ {
		nTightCnt := blank3753()
		nTightWav := blank3753()
		nFreeCnt := blank3753()
		nFreeWav := blank3753()
		for group := 0; group < 2; group++ {
			tight := group == 0
			cnt := &freeCnt
			wav := &freeWav
			hi := 9
			if tight {
				cnt = &tightCnt
				wav = &tightWav
				hi = digits[pos]
			}
			for s := 0; s <= 1; s++ {
				for d1 := 0; d1 <= none; d1++ {
					for d2 := 0; d2 <= none; d2++ {
						count := (*cnt)[s][d1][d2]
						if count == 0 {
							continue
						}
						total := (*wav)[s][d1][d2]
						for x := 0; x <= hi; x++ {
							started := 0
							if s == 1 || x != 0 {
								started = 1
							}
							gain := int64(0)
							var nd1, nd2 int
							if s == 1 {
								if d2 != none && ((d1 > d2 && d1 > x) || (d1 < d2 && d1 < x)) {
									gain = 1
								}
								nd1, nd2 = x, d1
							} else if started == 1 {
								nd1, nd2 = x, none
							} else {
								nd1, nd2 = none, none
							}
							acc := total + gain*count
							if tight && x == hi {
								nTightCnt[started][nd1][nd2] += count
								nTightWav[started][nd1][nd2] += acc
							} else {
								nFreeCnt[started][nd1][nd2] += count
								nFreeWav[started][nd1][nd2] += acc
							}
						}
					}
				}
			}
		}
		tightCnt = nTightCnt
		tightWav = nTightWav
		freeCnt = nFreeCnt
		freeWav = nFreeWav
	}
	var grand int64
	for _, tab := range [2][2][11][11]int64{tightWav, freeWav} {
		for s := 0; s <= 1; s++ {
			for d1 := 0; d1 <= none; d1++ {
				for d2 := 0; d2 <= none; d2++ {
					grand += tab[s][d1][d2]
				}
			}
		}
	}
	return grand
}
