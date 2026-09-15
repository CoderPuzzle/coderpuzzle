// Literal simulation: seed arr1 with nums[0] and arr2 with nums[1], then
// route each later element to whichever tail is greater. Distinct values
// mean the tails never tie, so this is decisive.
func resultArray(nums []int) []int {
	arr1 := []int{nums[0]}
	arr2 := []int{nums[1]}
	for _, num := range nums[2:] {
		if arr1[len(arr1)-1] > arr2[len(arr2)-1] {
			arr1 = append(arr1, num)
		} else {
			arr2 = append(arr2, num)
		}
	}
	return append(arr1, arr2...)
}
