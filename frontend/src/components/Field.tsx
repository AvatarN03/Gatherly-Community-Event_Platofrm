import type {ReactNode} from "react";

type FieldProps = {
    label: string;
    error?: string;
    children: ReactNode;
    classes?: string;
    attach?: string
}

export const Field = (
    {
        label,
        error,
        attach,
        children,
        classes
    }: FieldProps
) => (
    <div className="flex flex-col gap-1.5">

        <label htmlFor={attach}
               className={`text-xs uppercase tracking-widest text-teal-900 font-medium ${classes}`}>     {label}
        </label>

        {children}

        {error &&
            <p className="text-red-400 text-xs">{error}</p>
        }

    </div>
)
