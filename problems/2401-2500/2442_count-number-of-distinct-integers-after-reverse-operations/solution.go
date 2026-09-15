func countDistinctIntegers(nums []int) int {
	// The final array holds the originals plus one reversal per original,
	// so its distinct values are exactly the set {originals} ∪
	// {reversals}. Reversal never changes the digit count, so every value
	// stays <= 10^6 and fits an int. Leading zeros vanish naturally in
	// the arithmetic reversal: appending "0" first ("01" for 10) leaves a
	// leading zero that adds nothing.
	seen := make(map[int]bool, 2*len(nums))
	for _, value := range nums {
		seen[value] = true
		reversed := 0
		for rest := value; rest > 0; rest /= 10 {
			reversed = reversed*10 + rest%10
		}
		seen[reversed] = true
	}
	return len(seen)
}
