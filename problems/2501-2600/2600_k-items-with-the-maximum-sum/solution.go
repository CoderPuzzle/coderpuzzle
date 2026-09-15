func kItemsWithMaximumSum(numOnes, numZeros, numNegOnes, k int) int {
	// Spend the draw budget on the best items first: every +1 you
	// can take, then the 0s (free filler), then pay one point per
	// forced -1. Three ranges of k, three closed-form answers.
	if k <= numOnes {
		return k
	}
	if k <= numOnes+numZeros {
		return numOnes
	}
	return numOnes - (k - numOnes - numZeros)
}
