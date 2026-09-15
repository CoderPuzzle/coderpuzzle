// BFS over indices. When a prime-valued index p is first settled, every
// index whose value is divisible by p joins the next BFS layer, so the
// bucket of p is cleared after that single use — any later prime-p index
// is strictly farther. Buckets are built lazily by walking multiples of p
// up to max(nums) through a value -> indices table.
func minJumps(nums []int) int {
	n := len(nums)
	if n == 1 {
		return 0
	}
	limit := 0
	for _, v := range nums {
		if v > limit {
			limit = v
		}
	}
	isPrime := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		isPrime[i] = true
	}
	for f := 2; f*f <= limit; f++ {
		if isPrime[f] {
			for m := f * f; m <= limit; m += f {
				isPrime[m] = false
			}
		}
	}
	byValue := make(map[int][]int)
	for i, v := range nums {
		byValue[v] = append(byValue[v], i)
	}
	dist := make([]int, n)
	for i := range dist {
		dist[i] = -1
	}
	dist[0] = 0
	queue := []int{0}
	used := make(map[int]bool)
	for head := 0; head < len(queue); head++ {
		i := queue[head]
		d := dist[i] + 1
		if i > 0 && dist[i-1] == -1 {
			dist[i-1] = d
			queue = append(queue, i-1)
		}
		if i+1 < n && dist[i+1] == -1 {
			dist[i+1] = d
			queue = append(queue, i+1)
		}
		p := nums[i]
		if p > 1 && isPrime[p] && !used[p] {
			used[p] = true
			var bucket []int
			for m := p; m <= limit; m += p {
				bucket = append(bucket, byValue[m]...)
			}
			for _, j := range bucket {
				if dist[j] == -1 {
					dist[j] = d
					queue = append(queue, j)
				}
			}
		}
	}
	return dist[n-1]
}
