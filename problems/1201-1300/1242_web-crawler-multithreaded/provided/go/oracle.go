package main

import "sort"

// Problem-provided oracle (HtmlParser), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the url library and the edge list as generic
// values, then the query budget.
type HtmlParser struct {
	index   map[string]int
	names   []string
	links   [][]string
	fetched map[string]bool
	budget  int64
}

// NewHtmlParser builds the oracle from the case's construction values
// (the url library and directed edge list) and the query budget.
func NewHtmlParser(construction []any, budget int64) *HtmlParser {
	rawUrls, ok := construction[0].([]any)
	if !ok {
		panic("HtmlParser urls must be an array")
	}
	names := make([]string, 0, len(rawUrls))
	for _, entry := range rawUrls {
		url, ok := entry.(string)
		if !ok {
			panic("HtmlParser urls must be strings")
		}
		names = append(names, url)
	}
	links := make([][]string, len(names))
	index := make(map[string]int, len(names))
	for i, name := range names {
		index[name] = i
	}
	rawEdges, ok := construction[1].([]any)
	if !ok {
		panic("HtmlParser edges must be an array")
	}
	for _, entry := range rawEdges {
		pair, ok := entry.([]any)
		if !ok || len(pair) != 2 {
			panic("HtmlParser edges must be pairs")
		}
		source, ok1 := pair[0].(int64)
		target, ok2 := pair[1].(int64)
		if !ok1 || !ok2 {
			panic("HtmlParser edges must be integer pairs")
		}
		links[source] = append(links[source], names[target])
	}
	return &HtmlParser{index: index, names: names, links: links, fetched: map[string]bool{}, budget: budget}
}

// Verdict reports the crawl's observable effect: every page the crawler
// fetched, sorted.
func (parser *HtmlParser) Verdict() []string {
	out := make([]string, 0, len(parser.fetched))
	for url := range parser.fetched {
		out = append(out, url)
	}
	sort.Strings(out)
	return out
}

// GetUrls returns the outgoing links of the given page.
func (parser *HtmlParser) GetUrls(url string) []string {
	if parser.budget <= 0 {
		panic("HtmlParser query budget exhausted")
	}
	parser.budget--
	parser.fetched[url] = true
	position, ok := parser.index[url]
	if !ok {
		return []string{}
	}
	return append([]string(nil), parser.links[position]...)
}
