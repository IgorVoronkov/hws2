import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";
import s from "./SuperButton.module.css";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: "red" | "secondary" | "";
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        s.button,
        {
          [s.red]: xType === "red",
          [s.secondary]: xType === "secondary",
          [s.default]: !xType,
          [s.disabled]: disabled,
        },
        className,
      )}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  );
};

export default SuperButton;
