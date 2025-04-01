const Comments = [
    'Markkina on puhunut!',
    'Mistä näitä senttejä oikein tulee?',
    'Hintahan on aina mielessä',
    'Se nyt vaan on tyhmää maksaa liikaa!',
    'Pörssisähkö - todennäköisesti aina halvempi',
    'Have you heard about the miracle of ~Elisa Saunalahti~ pörssisähkö prices?',
]

export const getRandomComment = () => {
    return Comments[Math.floor(Math.random() * Comments.length)]
}
