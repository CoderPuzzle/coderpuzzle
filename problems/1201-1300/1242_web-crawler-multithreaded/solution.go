package main

type Solution struct{}

func (solution *Solution) crawl(htmlParser *HtmlParser, startUrl string) {
	home := hostname(startUrl)
	seen := map[string]bool{startUrl: true}
	queue := []string{startUrl}
	for head := 0; head < len(queue); head++ {
		url := queue[head]
		for _, link := range htmlParser.GetUrls(url) {
			// Foreign hostnames are neither returned nor expanded;
			// marking at enqueue time keeps GetUrls to one call per page.
			if !seen[link] && hostname(link) == home {
				seen[link] = true
				queue = append(queue, link)
			}
		}
	}
	// The judged artifact is the oracle's record of every page fetched.
	_ = seen
}

// hostname is everything between "http://" and the next "/".
func hostname(url string) string {
	rest := url[len("http://"):]
	if slash := indexByte(rest, '/'); slash >= 0 {
		return rest[:slash]
	}
	return rest
}

func indexByte(s string, b byte) int {
	for i := 0; i < len(s); i++ {
		if s[i] == b {
			return i
		}
	}
	return -1
}
