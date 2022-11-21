import { useState } from "react"
import { Modal } from "./lib/Modal"

const App = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleModal = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div>
			<button onClick={() => toggleModal()}>Open Modal</button>
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} title="My title" />
		</div>
	)
}

export default App
