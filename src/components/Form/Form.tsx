import {useMemo, useState} from 'react';
import useForm from "../../hooks/useForm";
import {FormType} from "../../types/types";
import FormField from "../FormField/FormField";
import {Input} from "../Input/Input";
import styles from './form.module.scss';
import {Button} from "../Button/Button";
import {submitForm} from "../../services/apiService";
import classNames from "classnames";
import PhoneInput from "../Input/PhoneInput";

const Form = () => {

    const isUsernameValid = (name: string) => {
        const regexp = /[A-Za-zА-Яа-я]{3,30}\s[A-Za-zА-Яа-я]{3,30}/;
        return name.length >= 3 && name.length <= 30 && regexp.test(name);
    }
    const isEmailValid = (email: string) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email.toLowerCase());
    }

    const isDateValid = (date: string) => {
        return true;
    }

    const isPhoneValid = (phone: string) => {
        return !phone.includes('_');
    }

    const isMessageValid = (message: string) => {
        return message.length >= 10 && message.length <= 300;
    }

    const form: FormType = {
        username: {
            valid: isUsernameValid,
        },
        email: {
            valid: isEmailValid
        },
        date: {
            valid: isDateValid
        },
        phone: {
            valid: isPhoneValid
        },
        message: {
            valid: isMessageValid
        },
    }


    const {values, errors, isValid, handleChange, validateAll, clear} = useForm(form);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');

    console.log(values);

    const messageClassName = useMemo(() => classNames(
        styles.formValidationForm,
        {
            [styles['formValidationForm--success']]: response === 'success',
            [styles['formValidationForm--error']]: response === 'error',
        },
    ), [response]);

    const onSubmit = async () => {
        validateAll();
        if (isValid) {
            setIsLoading(true);
            try {
                const message = await submitForm(values);
                setResponse(message);
                setIsLoading(false);
                clear();
            } catch (error) {
                setResponse(error as string);
                setIsLoading(false);
            }

        }
    }

    return (
        <div className={styles.formValidationForm}>
            <form>
                <FormField label="User Name" error={errors.username}>
                    <Input name="username"
                           value={values.username}
                           onChange={handleChange}
                           isInvalid={!!errors.username}
                    />
                </FormField>
                <FormField label="Email" error={errors.email}>
                    <Input name="email"
                           value={values.email}
                           onChange={handleChange}
                           isInvalid={!!errors.email}
                    />
                </FormField>
                <FormField label="Phone" error={errors.phone}>
                    <PhoneInput name="phone"
                           value={values.phone}
                           onChange={handleChange}
                           isInvalid={!!errors.phone}
                    />
                </FormField>
                <FormField label="Date" error={errors.date}>
                    <Input name="date"
                           type='date'
                           value={values.date}
                           onChange={handleChange}
                           isInvalid={!!errors.date}
                    />
                </FormField>
                <FormField label="Message" error={errors.message}>
                    <Input name="message"
                           isTextArea
                           value={values.message}
                           onChange={handleChange}
                           isInvalid={!!errors.message}
                    />
                </FormField>
            </form>
            <Button label="Submit" onClick={onSubmit} isLoading={isLoading} isDisabled={isLoading}/>
            {response && (
                <span className={messageClassName}>
                    <p>{response}</p>
                </span>
            )}
        </div>
    );

};

export default Form;
