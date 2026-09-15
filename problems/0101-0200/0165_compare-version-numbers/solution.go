// Two pointers walk both strings at once; each step reads the revision at
// each pointer as a number, so leading zeros vanish into the value instead of
// poisoning the comparison.
func compareVersion(version1 string, version2 string) int {
	n, m := len(version1), len(version2)
	i, j := 0, 0
	for i < n || j < m {
		var a int64
		for i < n && version1[i] != '.' {
			a = a*10 + int64(version1[i]-'0')
			i++
		}
		var b int64
		for j < m && version2[j] != '.' {
			b = b*10 + int64(version2[j]-'0')
			j++
		}
		if a != b {
			if a < b {
				return -1
			}
			return 1
		}
		// Step past the dot; a spent string leaves its pointer at n.
		if i < n {
			i++
		}
		if j < m {
			j++
		}
	}
	return 0
}
