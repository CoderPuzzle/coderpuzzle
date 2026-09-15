package main

type BrowserHistory struct{}

func NewBrowserHistoryTyped(homepage string) *BrowserHistory {
	panic("TODO")
}

func (design *BrowserHistory) visit(url string) {
	panic("TODO")
}

func (design *BrowserHistory) back(steps int) string {
	panic("TODO")
}

func (design *BrowserHistory) forward(steps int) string {
	panic("TODO")
}
