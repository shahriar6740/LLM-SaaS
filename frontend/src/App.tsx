import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	const bad = useCallback(() => {
		if (count === 0) {
			/* empty */
		}
	}, [count]);

	useEffect(() => {
		if (count) {
			/* empty */
		}
	}, [count]);

	return (
		<>
			<div>Hello World!</div>
		</>
	);
}

export default App;
