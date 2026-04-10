export const ECardCategory = {
    NONE: "none",
    FORMATION: "formation",
    SKILL: "skill",
    PROJECT: "project",
    SOFT_SKILL: "softSkill",
    EXPERIENCE: "experience",
    HOBBY: "hobby",
} as const
export type CardCategory = typeof ECardCategory[keyof typeof ECardCategory];

export const orderedCategories = [ECardCategory.FORMATION, ECardCategory.PROJECT, ECardCategory.EXPERIENCE, ECardCategory.SKILL, ECardCategory.SOFT_SKILL, ECardCategory.HOBBY];

export const ETagCategory = {
    SCIENTIST: "scientist",
    COMPETITION: "competition",
    VIDEO_GAME: "videoGame",
    PROGRAMMING: "programming",
    INTERNSHIP: "internship",
    PEDAGOGY: "pedagogy",
} as const
export type CardTag = typeof ETagCategory[keyof typeof ETagCategory];

export function getCategoryString(category: CardCategory)
{
    switch (category)
    {
        case ECardCategory.FORMATION:
            return "Formation";
        case ECardCategory.SKILL:
            return "Compétence";
        case ECardCategory.PROJECT:
            return "Projet";
        case ECardCategory.SOFT_SKILL:
            return "Soft Skill";
        case ECardCategory.EXPERIENCE:
            return "Expérience";
        case ECardCategory.HOBBY:
            return "Centre d’intérêt";
        default:
            console.error("Unknown category: ", category);
            return "";
    }
}

export function getTagString(tag: CardTag)
{
    switch (tag) {
        case ETagCategory.SCIENTIST:
            return "Scientifique";
        case ETagCategory.COMPETITION:
            return "Compétition";
        case ETagCategory.VIDEO_GAME:
            return "Jeu vidéo";
        case ETagCategory.PROGRAMMING:
            return "Programmation";
        case ETagCategory.INTERNSHIP:
            return "Stage";
        case ETagCategory.PEDAGOGY:
            return "Pédagogie";
        default:
            console.error("Unknown tag: ", tag);
            return "";
    }
}