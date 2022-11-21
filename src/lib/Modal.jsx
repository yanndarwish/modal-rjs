import React, { useRef, useEffect, useCallback } from "react"
import { useSpring, animated, easings } from "react-spring"
import "./Modal.css"
import close from "./close.svg"
import closeWhite from "./close-white.svg"

const Modal = ({
	isOpen,
	setIsOpen,
	className = "modal",
	id,
	testId,
	overlayClassName = "overlay",
	headerClassName = "modal-header",
	title = "Modal",
	titleClassName = "modal-title",
	bodyContent = "",
	bodyClassName = "modal-body",
	footerContent,
	footerClassName = "modal-footer",
	transition = 400,
	aria = {
		labelledby: "heading",
		describedby: "full_description",
	},
	role = "dialog",
	closeColor = "black",
}) => {
	const overlayRef = useRef()

	const animation = useSpring({
		config: {
			duration: transition,
			easing: easings.easeInOutQuad,
		},
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? `translateY(0%)` : `translateY(100px)`,
	})

	const closeModal = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const keyPress = useCallback(
		(e) => {
			if (e.key === "Escape" && isOpen) {
				setIsOpen(false)
			}
		},
		[setIsOpen, isOpen]
	)

	useEffect(() => {
		document.addEventListener("keydown", keyPress)
		return () => document.removeEventListener("keydown", keyPress)
	}, [keyPress])

	const Dialog = () => {
		return (
			<div id={id} className={className} role={role}>
				<div className={headerClassName}>
					<h1 id="heading" className={titleClassName}>
						{title}
					</h1>
					<img
						src={closeColor === "white" ? closeWhite : close}
						alt="close icon"
						className="modal-close"
						onClick={() => setIsOpen(false)}
					/>
				</div>
				{bodyContent && (
					<div id="full_description" className={bodyClassName}>
						{bodyContent}
					</div>
				)}
				{footerContent && (
					<div className={footerClassName}>{footerContent}</div>
				)}
			</div>
		)
	}

	return (
		<>
			{isOpen ? (
				<div ref={overlayRef} onClick={closeModal} className={overlayClassName}>
					<animated.div style={animation}>
					<Dialog isOpen={isOpen} />
					</animated.div>
				</div>
			) : null}
		</>
	)
}

export { Modal }
