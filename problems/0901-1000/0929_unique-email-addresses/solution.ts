function numUniqueEmails(emails: string[]): number {
    const distinct = new Set<string>();
    for (const email of emails) {
        let normalized = "";
        let ignored = false;
        for (let i = 0; i < email.length; i++) {
            const ch = email[i];
            if (ch === "@") {
                // The domain is untouched: take it verbatim from '@' on.
                normalized += email.slice(i);
                break;
            }
            if (ignored) {
                continue; // everything after the first '+' is dropped
            }
            if (ch === ".") {
                continue; // dots in the local name vanish
            }
            if (ch === "+") {
                ignored = true;
                continue;
            }
            normalized += ch;
        }
        distinct.add(normalized);
    }
    return distinct.size;
}
