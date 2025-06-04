import type { ReactElement } from "react"

export interface ButtonProps {
    variant: "primary" | "secondary"
    size: "md" | "sm" | "lg"
    startIcon?: any
    endIcon?: any
    text: string
    onClick: () => void
}

const sizeStyles = {
    "md": "px-4 py-2 text-md rounded-md",
    "lg": "px-6 py-4 text-xl rounded-xl",
    "sm": "px-2 py-1 text-sm rounded-sm",
}

const variantStyles = {
    "primary": "bg-[#7164c0] text-white",
    "secondary": "bg-[#d9ddee] text-[#9492db]",
}

const fontStyle = "font-thin"

export function Button(props: ButtonProps) {
    const StartIcon = props.startIcon;

    return (
        <button
            onClick={props.onClick}
            className={sizeStyles[props.size] + " " + variantStyles[props.variant] + " " + fontStyle}
        >
            <div className="flex items-center">
                {StartIcon && (
                    <span className="text-xs">
                        <StartIcon size={props.size} />
                    </span>
                )}
                <div className="pl-2 pr-2">{props.text}</div>
                {props.endIcon}
            </div>
        </button>
    );
}
