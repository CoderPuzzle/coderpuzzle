// A FIFO queue of (tokenId, expiry) events plus a map of each token's
// current expiry. Call times strictly increase and an expiry is always
// currentTime + timeToLive, so every generate — and every fulfilled renew
// — appends the largest expiry seen so far to the tail; expiries grow
// along the queue. countUnexpiredTokens retires the front while it is
// stale (a renew superseded it) or expired, and then the map's size is
// the live count: nothing behind an unexpired front can be expired.
class AuthenticationManager {
    private timeToLive: number;
    private expiryByToken: Map<string, number>;
    private queue: { tokenId: string; expiry: number }[];

    constructor(timeToLive: number) {
        this.timeToLive = timeToLive;
        this.expiryByToken = new Map();
        this.queue = [];
    }

    generate(tokenId: string, currentTime: number): void {
        const expiry = currentTime + this.timeToLive;
        this.expiryByToken.set(tokenId, expiry);
        this.queue.push({ tokenId, expiry });
    }

    renew(tokenId: string, currentTime: number): void {
        const expiry = this.expiryByToken.get(tokenId);
        if (expiry === undefined || expiry <= currentTime) {
            return;
        }
        const renewed = currentTime + this.timeToLive;
        this.expiryByToken.set(tokenId, renewed);
        this.queue.push({ tokenId, expiry: renewed });
    }

    countUnexpiredTokens(currentTime: number): number {
        while (this.queue.length > 0) {
            const front = this.queue[0];
            if (this.expiryByToken.get(front.tokenId) === front.expiry) {
                if (front.expiry > currentTime) {
                    break;
                }
                this.expiryByToken.delete(front.tokenId);
            }
            this.queue.shift();
        }
        return this.expiryByToken.size;
    }
}
