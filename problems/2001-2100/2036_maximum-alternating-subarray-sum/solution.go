func maximumAlternatingSubarraySum(nums []int) int64 {
	plus := int64(nums[0])
	var minus int64
	hasMinus := false
	answer := plus

	for index := 1; index < len(nums); index++ {
		value := int64(nums[index])
		newPlus := value
		if hasMinus && minus+value > newPlus {
			newPlus = minus + value
		}
		newMinus := plus - value

		if newPlus > answer {
			answer = newPlus
		}
		if newMinus > answer {
			answer = newMinus
		}
		plus = newPlus
		minus = newMinus
		hasMinus = true
	}
	return answer
}
