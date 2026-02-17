export type LevelData = {
    level: number;
    title: string;
};

export const allLevels: LevelData[] = [
    { level: 1, title: "Lycée et Prépa"},
    { level: 2, title: "Ecole d'ingénieur et Stages"},
    { level: 3, title: "Programmeur gameplay"},
    { level: 4, title: "Concepteur pédagogique digital"},
];

export type DeckData = {
    cardIds: number[];
}

export const allDecks: DeckData[] = [
    {cardIds: [1, 2, 20, 27, 34, 37, 39]},
    {cardIds: [3, 5, 6, 7, 9, 11, 16, 17, 22, 26, 29, 30, 31, 34, 37, 39, 40]},
    {cardIds: [8, 10, 12, 13, 14, 21, 23, 32, 33, 34, 35, 37, 38]},
    {cardIds: [4, 15, 18, 19, 24, 25, 28, 31, 33, 34, 35, 36, 37]},
]