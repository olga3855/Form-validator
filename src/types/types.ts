export interface FormFieldType {
    valid?: (v: string) => boolean
}

export type FormType = Record<string, FormFieldType>
export type ValuesType = Record<string, string>;
export type InputElement = HTMLInputElement | HTMLTextAreaElement;