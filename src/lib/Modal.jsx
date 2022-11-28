import React, { useRef, useEffect, useCallback } from "react"
import { useSpring, animated, easings } from "react-spring"
import PropTypes from "prop-types"
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
			<div
				id={id}
				data-testid={testId}
				className={className}
				role={role}
				aria={aria}
			>
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

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	className: PropTypes.string,
	id: PropTypes.string,
	testId: PropTypes.string,
	overlayClassName: PropTypes.string,
	headerClassName: PropTypes.string,
	title: PropTypes.string,
	titleClassName: PropTypes.string,
	bodyContent: PropTypes.node,
	bodyClassName: PropTypes.string,
	footerContent: PropTypes.node,
	footerClassName: PropTypes.string,
	transition: PropTypes.number,
	aria: PropTypes.object,
	role: PropTypes.string,
	closeColor: PropTypes.string,
}

Modal.defaultProps = {
	className: "modal",
	overlayClassName: "overlay",
	headerClassName: "modal-header",
	title: "Modal",
	titleClassName: "modal-title",
	bodyContent: "",
	bodyClassName: "modal-body",
	footerClassName: "modal-footer",
	transition: 400,
	aria: {
		labelledby: "heading",
		describedby: "full_description",
	},
	role: "dialog",
	closeColor: "black",
}

export { Modal }
