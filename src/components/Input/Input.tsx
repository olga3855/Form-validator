import {InputHTMLAttributes, useMemo} from 'react';
import {InputElement} from "../../types/types";
import classNames from 'classnames';
import styles from './styles.module.scss';

export interface InputProps extends InputHTMLAttributes<InputElement> {
    isInvalid?: boolean
    inputClassName?: string
    isTextArea?: boolean
}

export const Input = ({
                          type,
                          name,
                          value,
                          onChange,
                          onBlur,
                          isInvalid,
                          className,
                          inputClassName,
                          isTextArea,
                          ...other
}: InputProps) => {

    let inputType = type;

    const inputClass = useMemo(() => classNames(
        styles.formInput,
        className,
        {
            [styles['formInput--invalid']]: isInvalid,
            [styles['formInput--textarea']]: isTextArea,
        },
    ), [isInvalid, className, isTextArea]);


    const InputComponent = isTextArea ? 'textarea' : 'input';

    return (
        <div className={inputClass}>
            <InputComponent
                className={inputClassName}
                name={name}
                type={inputType}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...other}
            />
        </div>
    );
};
