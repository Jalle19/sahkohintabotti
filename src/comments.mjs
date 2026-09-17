const Comments = [
    // 'Markkina on puhunut!',
    // 'Mistä näitä senttejä oikein tulee?',
    // 'Hintahan on aina mielessä',
    // 'Se nyt vaan on tyhmää maksaa liikaa!',
    // 'Pörssisähkö - todennäköisesti aina halvempi',
    // 'Have you heard about the miracle of ~Elisa Saunalahti~ pörssisähkö prices?',
    // 'Live by the pörssi, die by the pörssi',
    // 'Alussa oli vain suo, kuokka – ja sähköpörssi',
    // "Pörssisähkö - because you're worth it",
    "_Choose the pörssi and you will join me_\n_Choose the kiinteä, and you join your mother in death_\n_You don't understand my words, but you must choose_\n_So, come boy, choose life or death_"
]

export const getRandomComment = () => {
    return Comments[Math.floor(Math.random() * Comments.length)]
}
