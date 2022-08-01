import {ChangeEvent, useEffect, useState} from "react";
import {FormType, InputElement, ValuesType} from "../types/types";


const useForm = (form: FormType) => {
    const [values, setValues] = useState<ValuesType>({});
    const [errors, setErrors] = useState<ValuesType>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
       clear();
    }, []);


    useEffect(() => {
        validate()
    }, [values]);

    const handleChange = (e: ChangeEvent<InputElement>) => {
        const {name, value} = e.target;

        setValues({...values, [name]: value});

        if (form[name].valid && !form[name].valid?.(value)) {
            setErrors({...errors, [name]: `${name} is not valid`});
        } else {
            delete errors[name];
        }
    }

    const validate = () => {
        let valid = true;
        Object.keys(form).forEach((key) => {
            if (!values[key] || errors[key]) {
                valid = false;
            }
        })
        setIsValid(valid);
    }

    const validateAll = () => {
        const validatedErrors = {...errors};
        Object.keys(form).forEach((key) => {
            if (!values[key]) {
                validatedErrors[key] = errors[key] || `${key} is required`;
            }
        })
        setErrors(validatedErrors);
    }

    const clear = () => {
        const values: ValuesType = {};
        Object.keys(form).forEach((key) => {
            values[key] = '';
        })
        setValues(values);
    }

    return {
        values,
        errors,
        isValid,
        handleChange,
        validateAll,
        clear
    }
}

export default useForm;