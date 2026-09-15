// Counter-indexed tiny URLs: the object keeps every URL it has encoded,
// in order, and answers with "http://tinyurl.com/" plus the URL's 1-based
// position in that list written in lowercase base-36 — "1" for the first,
// "a" for the tenth, "10" for the 36th.
class Codec {
    private urls: string[] = [];

    constructor() {}

    encode(longUrl: string): string {
        this.urls.push(longUrl);
        const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
        // divmod yields the least-significant digit first, so each new
        // digit is prepended — the loop ends with the most significant.
        let position = this.urls.length;
        let suffix = "";
        while (position > 0) {
            suffix = digits[position % 36] + suffix;
            position = Math.floor(position / 36);
        }
        return "http://tinyurl.com/" + suffix;
    }

    decode(shortUrl: string): string {
        const suffix = shortUrl.slice("http://tinyurl.com/".length);
        return this.urls[parseInt(suffix, 36) - 1];
    }
}
