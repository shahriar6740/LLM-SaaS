import React, { forwardRef, ReactNode, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { cn } from "@/lib/utils.ts";

export interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
	prependIcon?: ReactNode;
	appendIcon?: ReactNode;
	wrapperClassName?: string;
}

const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>((props, ref) => {
	const { prependIcon, appendIcon, wrapperClassName, ...rest } = props;
	const [isFocussed, setIsFocussed] = useState(false);
	return (
		<span className={cn("relative", wrapperClassName)}>
			{
				prependIcon &&
				<span className="absolute top-1/2 transform -translate-y-1/2 left-3 cursor-pointer">
					{prependIcon}
				</span>
			}
			<Input {...rest} ref={ref} className={cn(rest.className, { "pl-10": !!prependIcon, "pr-10": !!appendIcon })}
						 onFocus={() => setIsFocussed(prev => !prev)} />
			{
				appendIcon &&
				<span className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer">
					{appendIcon}
				</span>
			}
		</span>
	);
});


export default InputWithIcon;
