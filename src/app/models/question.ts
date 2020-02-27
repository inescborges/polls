export interface IQuestion {
    id: number,
    question: string,
    image_url: string,
    thumb_url: string,
    published_at: string,
    choices: choice[]
}
interface choice {
    choice: string,
    votes: number
}