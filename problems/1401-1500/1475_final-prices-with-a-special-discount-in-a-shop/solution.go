func finalPrices(prices []int) []int {
	answer := make([]int, len(prices))
	copy(answer, prices)
	stack := []int{} // indices with pending discount
	for i, price := range prices {
		for len(stack) > 0 && prices[stack[len(stack)-1]] >= price {
			idx := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			answer[idx] -= price
		}
		stack = append(stack, i)
	}
	return answer
}
