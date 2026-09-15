# sed answers with an address: -E turns on extended regexps, the pattern
# covers both shapes with a grouped repetition for the hyphenated run,
# and the p flag prints exactly the lines whose address matches.
sed -nE '/^([0-9]{3}-){2}[0-9]{4}$|^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/p'
