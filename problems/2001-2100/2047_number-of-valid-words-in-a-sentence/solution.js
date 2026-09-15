var countValidWords = function (sentence) {
    return sentence
        .trim()
        .split(/\s+/)
        .filter((token) => isValid(token)).length;
};

function isValid(token) {
    let hyphens = 0;
    let punctuation = 0;

    for (let index = 0; index < token.length; index++) {
        const character = token[index];
        if (character >= "a" && character <= "z") {
            continue;
        }
        if (character === "-") {
            hyphens++;
            if (
                hyphens > 1 ||
                index === 0 ||
                index + 1 === token.length ||
                token[index - 1] < "a" ||
                token[index - 1] > "z" ||
                token[index + 1] < "a" ||
                token[index + 1] > "z"
            ) {
                return false;
            }
        } else if (character === "!" || character === "." || character === ",") {
            punctuation++;
            if (punctuation > 1 || index + 1 !== token.length) {
                return false;
            }
        } else {
            return false;
        }
    }

    return true;
}
