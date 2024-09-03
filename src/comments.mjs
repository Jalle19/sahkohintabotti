const Comments = [
    'Markkina on puhunut!',
    'Mistä näitä senttejä oikein tulee?',
    'Taivas varjele, mitä sieltä tulee? Sieltä tulee hi-nnat!',
    'Se nyt vaan on tyhmää maksaa liikaa!',
    'Have you heard about the miracle of pörssisähkö prices?',
]

export const getRandomComment = () => {
    return Comments[Math.floor(Math.random() * Comments.length)]
}
