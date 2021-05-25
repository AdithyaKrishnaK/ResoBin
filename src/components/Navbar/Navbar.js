import styled from 'styled-components'
import ResoBinLogo from '@app/components/navbar/ResoBinLogo'
import DarkModeCheckbox from '@app/components/navbar/DarkModeCheckbox'
import CurrentTerm from '@app/components/navbar/CurrentTerm'

const Container = styled.div`
	display: flex;
	align-items: center;
	/* justify-content: space-between; */
	
	position: fixed;
	width: 100%;
	height: 4rem;
	left: 0px;
	top: 0px;
	background: ${({ theme }) => theme.darksecondary};
`

const LeftContainer = styled.div`
	min-width: 11.5rem;
	min-height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

const RightContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 19rem;
	height: 100%
`

const MiddleContainer = styled.div`
	width: calc(100% - 11.5rem - 19rem);
`

const Navbar = () => {
    return (
		<Container>
			<LeftContainer>
				<ResoBinLogo />
			</LeftContainer>

			<MiddleContainer>
				<CurrentTerm text="AY 2021/22 | AUTUMN" />
			</MiddleContainer>

			<RightContainer>
				<DarkModeCheckbox />
			</RightContainer>
		</Container>
	)
}

export default Navbar
