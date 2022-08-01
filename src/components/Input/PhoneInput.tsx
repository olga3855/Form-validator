import { useMemo, useRef} from 'react';
import InputMask from 'react-input-mask';
import styles from './styles.module.scss';
import classNames from "classnames";
import {InputProps} from "./Input";

const PhoneInput = ({isInvalid, ...props}: InputProps) => {

    const inputRef = useRef(null);

    const inputClass = useMemo(() => classNames(
        styles.formInput,
        {
            [styles['formInput--invalid']]: isInvalid,
        },
    ), [isInvalid]);

    return (
        <div className={inputClass}>
            <InputMask mask="+7 99 999 999" {...props} ref={inputRef}/>
        </div>
    );
};

export default PhoneInput;

