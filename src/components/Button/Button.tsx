import classNames from 'classnames';
import styles from './button.module.scss';

type Props = {
    label: string,
    buttonType?: 'button' | 'submit',
    className?: string,
    isDisabled?: boolean,
    isLoading?: boolean,
    onClick?: Function,
};

export const Button = ({
                           label,
                           buttonType = 'button',
                           className,
                           isDisabled,
                           isLoading,
                           onClick,
                       }: Props) => {
    const buttonClass = classNames(
        styles.formValidationButton,
        {
            [styles['formValidationButton--loading']]: isLoading,
            [styles['formValidationButton--disabled']]: isDisabled,
        },
        className,
    );

    return (
        <>
            <button
                type={buttonType}
                className={buttonClass}
                disabled={isDisabled || isLoading}
                onClick={e => !isLoading && !isDisabled && onClick?.(e)}
            >
                <div className={styles.formValidationButton__label}>
                    {isLoading ? 'Submitting...' : label}
                </div>
            </button>
        </>
    );
};
