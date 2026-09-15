import "strings"

// Split at the star: the fixed prefix must occur somewhere and the
// fixed suffix somewhere after it; the star absorbs whatever sits
// between the two.
func hasMatch(s string, p string) bool {
	star := strings.IndexByte(p, '*')
	pre, suf := p[:star], p[star+1:]
	first := strings.Index(s, pre)
	last := strings.LastIndex(s, suf)
	return first != -1 && last != -1 && first+len(pre) <= last
}
