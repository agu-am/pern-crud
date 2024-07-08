import { forwardRef } from "react"

export const TextArea = forwardRef((props, ref) => {
    return (
        <textarea
            type="text"
            ref={ref}
            className="bg-zinc-800 px-3 py-2 block my-2 w-full"
            {...props}
        >
            {props.children}
        </textarea>
    )
})

export default TextArea