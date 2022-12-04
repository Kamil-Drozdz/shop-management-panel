import { useState } from 'react';
import Modal from 'styled-react-modal';
import Button from './Button.styled';

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition : all 0.3s ease-in-out;`;

function StyledModalButton() {
	const [isOpen, setIsOpen] = useState(false);
	const [opacity, setOpacity] = useState(0);

	function toggleModal() {
		setOpacity(0);
		setIsOpen(!isOpen);
	}

	function afterOpen() {
		setTimeout(() => {
			setOpacity(1);
		}, 100);
	}

	function beforeClose() {
		return new Promise(resolve => {
			setOpacity(0);
			setTimeout(resolve, 300);
		});
	}

	return (
		<div>
			<Button onClick={toggleModal}>Dodaj Produkt</Button>
			<StyledModal
				isOpen={isOpen}
				afterOpen={afterOpen}
				beforeClose={beforeClose}
				onBackgroundClick={toggleModal}
				onEscapeKeydown={toggleModal}
				opacity={opacity}
				backgroundProps={{ opacity }}>
				<p>tu ma być dodanie produktu w formularzu</p>
			</StyledModal>
		</div>
	);
}

export default StyledModalButton;
