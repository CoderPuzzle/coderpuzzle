class TweetCounts {
    // Per-name sorted time lists; a query slices its window into chunks and
    // counts each chunk with two binary searches.
    constructor() {
        this.times = new Map();
    }

    /**
     * @param {string} tweetName
     * @param {number} time
     * @return {void}
     */
    recordTweet(tweetName, time) {
        let list = this.times.get(tweetName);
        if (list === undefined) {
            list = [];
            this.times.set(tweetName, list);
        }
        // Insert at the first position whose time exceeds `time`.
        let at = this._upperBound(list, time);
        list.splice(at, 0, time);
    }

    /**
     * @param {string} freq
     * @param {string} tweetName
     * @param {number} startTime
     * @param {number} endTime
     * @return {number[]}
     */
    getTweetCountsPerFrequency(freq, tweetName, startTime, endTime) {
        const chunk = TweetCounts.CHUNKS[freq];
        const list = this.times.get(tweetName) || [];
        const buckets = [];
        for (let lo = startTime; lo <= endTime; lo += chunk) {
            const hi = Math.min(lo + chunk - 1, endTime);
            buckets.push(this._upperBound(list, hi) - this._lowerBound(list, lo));
        }
        return buckets;
    }

    /** First index whose value is at least target. */
    _lowerBound(list, target) {
        let lo = 0;
        let hi = list.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (list[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    /** First index whose value is strictly greater than target. */
    _upperBound(list, target) {
        let lo = 0;
        let hi = list.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (list[mid] <= target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}

TweetCounts.CHUNKS = { minute: 60, hour: 3600, day: 86400 };
