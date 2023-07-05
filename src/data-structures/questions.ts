

export interface QuestionType {
    type: "selector"|"typing"|"multiple"
    options?: Array<OptionType> 
    "first-statement"?: string
    "last-statement"?: string
    solution: number | string
    "is-correct"?: boolean
    "selected-option"?: number|string
}


interface OptionType  {
    id:number
    label:string
}

type QuestionsType = Array<QuestionType>

const a:QuestionsType =[{type:"multiple",solution:"yuffyfuyu",options:[{id:5,label:"h"}]}] 