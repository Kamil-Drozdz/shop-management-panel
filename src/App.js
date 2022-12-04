import ProductsList from './components/ProductsList';
import styled from 'styled-components';
import { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import StyledModalButton from './components/styles/StyledModal.styled';

const FadingBackground = styled(BaseModalBackground)`
	opacity: ${props => props.opacity};
	transition: all 0.3s ease-in-out;
`;

function App() {
	return (
		<>
			<ProductsList />
			<ModalProvider backgroundComponent={FadingBackground}>
				<div className='App'>
					<h3>Chcesz dodać produkt?</h3>
					<StyledModalButton />
				</div>
			</ModalProvider>
		</>
	);
}

export default App;
