import Container from './styles/Container.styled';
import { useState, useEffect } from 'react';
import List from './List';
import StyledDiv from './styles/StyledDiv.styled';
import Button from './styles/Button.styled';
import Img from './styles/Img.styled';
import Carousel from 'react-elastic-carousel';
import ProductCard from './styles/ProductCard.styled';
import Input from './styles/Input.styled';
import TextH1 from './styles/TextH1.styled';
import StyledLl from './styles/StyledLi.styled';
import StyledUl from './styles/StyledUi.styled';

const breakPoints = [
	{ width: 500, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2 },
	{ width: 768, itemsToShow: 3 },
	{ width: 1200, itemsToShow: 4 },
];

const ProductsList = () => {
	const [list, setList] = useState(List);
	const [values, setValues] = useState({
		id: '',
		name: '',
		price: '',
		image: '',
		stocked: '',
	});
	const updateFieldChanged = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleChange = () => {
		setList([...list, values]);
		setValues({
			id: '',
			name: '',
			price: '',
			image: '',
			stocked: '',
		});
	};
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		setIsValid(values.name.length > 0 && list.length < 6 ? true : false);
	}, [values]);

	const removeProduct = () => {
		const endRange = Math.max(0, list.length - 1);
		setList(list.slice(0, endRange));
	};

	const updateProduct = (e, item) => {
		const indexToUpdate = list.findIndex(index => index.id === item.id);
		const updatedLists = [...list];
		setValues({
			id: '',
			...values,
		});

		updatedLists[indexToUpdate] = { ...values, [e.target.name]: e.target.value };
		setList(updatedLists);
	};

	return (
		<>
			<Container>
				<StyledUl>
					<StyledLl>
						<form>
							<>Produkt</>
							<br />
							<Input
								type='number'
								id='id'
								name='id'
								placeholder='Numer ID produktu'
								onChange={updateFieldChanged}
								required
							/>
							<br />
							<Input
								type='text'
								id='name'
								name='name'
								placeholder='Nazwa produktu'
								onChange={updateFieldChanged}
								required
							/>
							<br />
							<Input
								type='number'
								id='price'
								name='price'
								placeholder='Cena produktu'
								onChange={updateFieldChanged}
								required
							/>
							<br />
							<Input
								type='text'
								id='image'
								name='image'
								placeholder='Zdjęcie produktu'
								onChange={updateFieldChanged}
								required
							/>
							<br />
							<select name='stocked' onChange={updateFieldChanged} defaultValue='czy produkt jest?'>
								<option disabled>czy produkt jest? </option>
								<option value={'Niedotępny'}>Niedostępny</option>
								<option value={'Dostępny'}>Dostępny</option>
							</select>
							{!isValid && <p>Musisz dodać wartość zanim dodasz Przedmiot</p>}
							<Button disabled={!isValid} type='button' onClick={handleChange}>
								Dodaj
							</Button>
						</form>
					</StyledLl>
				</StyledUl>
				<StyledDiv>
					<StyledUl>
						{list.map((item, index) => (
							<StyledLl key={`${index}`}>
								<form>
									<>Produkt nr: {index}</>
									<br />
									<Input
										type='number'
										id='id'
										name='id'
										placeholder='Numer ID produktu'
										onChange={updateFieldChanged}
										required
									/>
									<br />
									<Input
										type='text'
										id='name'
										name='name'
										placeholder='Nazwa produktu'
										onChange={updateFieldChanged}
										required
									/>
									<br />
									<Input
										type='number'
										id='price'
										name='price'
										placeholder='Cena produktu'
										onChange={updateFieldChanged}
										required
									/>
									<br />
									<Input
										type='text'
										id='image'
										name='image'
										placeholder='Zdjęcie produktu'
										onChange={updateFieldChanged}
										required
									/>
									<br />
									<select name='stocked' onChange={updateFieldChanged} defaultValue='czy produkt jest?'>
										<option disabled>czy produkt jest? </option>
										<option value={'Niedotępny'}>Niedostępny</option>
										<option value={'Dostępny'}>Dostępny</option>
									</select>
									{!isValid && <p>Musisz dodać wartość zanim zaktualizujesz </p>}
									<Button disabled={!isValid} onClick={e => updateProduct(e, item)}>
										Zaktualizuj
									</Button>
								</form>
							</StyledLl>
						))}
					</StyledUl>
				</StyledDiv>
			</Container>
			<TextH1>Lista produktów!</TextH1>
			<Carousel className='ProductsList' breakPoints={breakPoints}>
				{list.map(item => {
					return (
						<>
							<StyledDiv>
								<ProductCard>
									<li>
										<Img src={item.image} alt='' />
									</li>
									<div>{item.price} Zł</div>
									<br />
									<li>{item.name}</li>
									<br />
									<div>Dostępność w magazynie:</div>
									{item.stocked}
								</ProductCard>
							</StyledDiv>
						</>
					);
				})}
			</Carousel>
			<h3>Chcesz usunąć produkt?</h3>
			<Button onClick={removeProduct}>Usuń produkt</Button>
		</>
	);
};

export default ProductsList;
