# awk filters whole records against an extended pattern spelled per
# character: three digits, hyphen, three digits, hyphen, four digits — or
# the parenthesized shape with its literal space. Matching lines fall
# through to the default action, which prints them.
awk '/^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/ ||
     /^\([0-9][0-9][0-9]\) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/'
