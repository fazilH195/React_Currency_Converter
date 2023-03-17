import { Navbar, Container } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar className='shadow' style={{'color':'black'}}>
            <Container>
                <Navbar.Brand className='mx-auto fs-2'>Currency Converter</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header;