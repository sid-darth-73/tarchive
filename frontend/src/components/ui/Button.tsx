export interface ButtonProps  {
    variant: "primary" | "secondary"
    size: "md" | "sm" | "lg"
    startIcon?: any
    endIcon?: any
    text: string
    onCick: () => void
}

const sizeStyles = {
    "md": "px-4 py-2 text-md rounded-md",
    "lg": "px-8 py-4 text-xl rounded-xl",
    "sm": "px-2 py-1 text-sm rounded-sm",
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-400 text-purple-600",
}
export function Button(props: ButtonProps) {
    const Comp = props.startIcon;
    return <button className={sizeStyles[props.size] + " " + variantStyles[props.variant]}>
        <div className="flex items-center">
            <span className="text-xs">
                <Comp size={props.size} />
            </span>
            <div className="pl-2 pr-2">
                {props.text}
            </div>
            {props.endIcon}
        </div>
    </button>
}