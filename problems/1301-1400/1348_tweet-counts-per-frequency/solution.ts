class TweetCounts {
    // Per-name sorted time lists; a query slices its window into chunks and
    // counts each chunk with two binary searches.
    private static readonly CHUNKS: Record<string, number> = { minute: 60, hour: 3600, day: 86400 };
    private times = new Map<string, number[]>();

    constructor() {}

    recordTweet(tweetName: string, time: number): void {
        let list = this.times.get(tweetName);
        if (list === undefined) {
            list = [];
            this.times.set(tweetName, list);
        }
        // Insert at the first position whose time exceeds `time`.
        list.splice(this.upperBound(list, time), 0, time);
    }

    getTweetCountsPerFrequency(freq: string, tweetName: string, startTime: number, endTime: number): number[] {
        const chunk = TweetCounts.CHUNKS[freq];
        const list = this.times.get(tweetName) || [];
        const buckets: number[] = [];
        for (let lo = startTime; lo <= endTime; lo += chunk) {
            const hi = Math.min(lo + chunk - 1, endTime);
            buckets.push(this.upperBound(list, hi) - this.lowerBound(list, lo));
        }
        return buckets;
    }

    /** First index whose value is at least target. */
    private lowerBound(list: number[], target: number): number {
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
    private upperBound(list: number[], target: number): number {
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
