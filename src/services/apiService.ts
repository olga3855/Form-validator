import {ValuesType} from "../types/types";

export const submitForm = (values: ValuesType): Promise<string> => {
    console.log('submit');
    const random = Math.round(Math.random());
    const response = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            if (random) {
                resolve('success');
            } else {
                reject('error')
            }
        }, 500);
    });
   return response;
}