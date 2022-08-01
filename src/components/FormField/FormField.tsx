import React, {useCallback, useMemo} from 'react';
import styles from './styles.module.scss';
import classNames from "classnames";

export interface FormFieldProps {
    label?: string
    error?: string
    className?: string
    children?: React.ReactNode,
}

export const FormField: React.FC<FormFieldProps> = ({children,
                                                        label,
                                                        error,
                                                        className
}) => {

    const renderValidationError = useCallback(() => {
        const isInvalidField = (error);

        if (!isInvalidField) {
            return null;
        }

        return (
            <span className={styles.formField__error}>
                <p>{error}</p>
            </span>
        );
    }, [error]);

    const fieldClassname = useMemo(() => classNames(styles.formField, className), [className]);

    return (
        <div className={fieldClassname}>
            <div className={styles.formField__label}>
                {label && (
                    <div className={styles.formField__labelText}>
                        {label}
                    </div>
                )}
            </div>
            {children}
            {renderValidationError()}
        </div>
    );
};

export default FormField;