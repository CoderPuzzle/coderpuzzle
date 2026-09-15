/**
 * @param {number} n
 * @param {number[][]} languages
 * @param {number[][]} friendships
 * @return {number}
 */
var minimumTeachings = function (n, languages, friendships) {
    // Exactly one language may be taught, so a friendship that already
    // shares some language is settled forever and never forces teaching;
    // filter down to the needy pairs that share nothing. A chosen
    // language L fixes exactly the needy pairs whose both sides know L
    // afterwards, and a user lacking L is taught once however many
    // needy pairs it appears in — so the answer is the minimum, over
    // the n languages, of the users to teach.
    const users = languages.length;
    const known = Array.from({ length: users + 1 }, () => new Array(n + 1).fill(false));
    for (let user = 1; user <= users; ++user) {
        for (const language of languages[user - 1]) known[user][language] = true;
    }
    const needy = friendships.filter((pair) => {
        for (let language = 1; language <= n; ++language) {
            if (known[pair[0]][language] && known[pair[1]][language]) return false;
        }
        return true;
    });
    let best = users;
    for (let language = 1; language <= n; ++language) {
        // taught[user] keeps each user lacking this language counted
        // once across every needy pair it takes part in.
        const taught = new Array(users + 1).fill(false);
        let count = 0;
        for (const [u, v] of needy) {
            for (const user of [u, v]) {
                if (!known[user][language] && !taught[user]) {
                    taught[user] = true;
                    ++count;
                }
            }
        }
        best = Math.min(best, count);
    }
    return best;
};
