import { useCallback, useState } from "react";

const useToggle = (defaultValue: boolean) => {
	const [value, setValue] = useState(defaultValue);

	const toggle = useCallback(() => {
		setValue(prevValue => !prevValue);
	}, []);

	return [value, toggle, setValue];
};

export default useToggle;
