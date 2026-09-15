package main

// A FIFO queue of (tokenId, expiry) events plus a map of each token's
// current expiry. Call times strictly increase and an expiry is always
// currentTime + timeToLive, so every generate — and every fulfilled renew
// — appends the largest expiry seen so far to the tail; expiries grow
// along the queue. countUnexpiredTokens retires the front while it is
// stale (a renew superseded it) or expired, and then the map's size is
// the live count: nothing behind an unexpired front can be expired.
type tokenEntry struct {
	tokenId string
	expiry  int
}

type AuthenticationManager struct {
	timeToLive    int
	expiryByToken map[string]int
	queue         []tokenEntry
}

func NewAuthenticationManagerTyped(timeToLive int) *AuthenticationManager {
	return &AuthenticationManager{timeToLive: timeToLive, expiryByToken: make(map[string]int)}
}

func (design *AuthenticationManager) generate(tokenId string, currentTime int) {
	expiry := currentTime + design.timeToLive
	design.expiryByToken[tokenId] = expiry
	design.queue = append(design.queue, tokenEntry{tokenId: tokenId, expiry: expiry})
}

func (design *AuthenticationManager) renew(tokenId string, currentTime int) {
	if expiry, ok := design.expiryByToken[tokenId]; ok && expiry > currentTime {
		expiry = currentTime + design.timeToLive
		design.expiryByToken[tokenId] = expiry
		design.queue = append(design.queue, tokenEntry{tokenId: tokenId, expiry: expiry})
	}
}

func (design *AuthenticationManager) countUnexpiredTokens(currentTime int) int {
	for len(design.queue) > 0 {
		front := design.queue[0]
		if expiry, ok := design.expiryByToken[front.tokenId]; ok && expiry == front.expiry {
			if expiry > currentTime {
				break
			}
			delete(design.expiryByToken, front.tokenId)
		}
		design.queue = design.queue[1:]
	}
	return len(design.expiryByToken)
}
