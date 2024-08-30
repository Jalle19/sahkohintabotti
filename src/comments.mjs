const Comments = [
    'Markkina on puhunut!',
    'Mistä näitä senttejä oikein tulee?',
    'Taivas varjele, mitä sieltä tulee? Sieltä tulee hi-nnat!',
    'Se nyt vaan on tyhmää maksaa liikaa!'
]

export const getRandomComment = () => {
    return Comments[Math.floor(Math.random() * Comments.length)]
}
