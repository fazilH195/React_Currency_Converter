import { useState, useEffect } from "react";
import generateRate from "../generateRate";
import greaterThanThreeshold from "../greaterThanThreeshold";
import { Card, Col, Form, Row, Button } from "react-bootstrap";

const INITIAL_CURR = 'EUR';
const INITIAL_FXRATE = 1.1;

const ConverterCard = ({ addData, clearHistory }) => {

    const [fxRate, setFxRate] = useState(INITIAL_FXRATE);
    const [inputCurr, setInputCurr] = useState(INITIAL_CURR);

    const [customInput, setCustomInput] = useState(false);
    const [override, setoverride] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [convertedValue, setConvertedValue] = useState(0);

    useEffect(() => {
        setInterval(changeRate, 3000)
    }, [])

    const changeRate = () => {
        setFxRate(generateRate().toFixed(3))
    }

    const handleCurrencyChange = (value) => {
        value === 'USD' ? setInputCurr('EUR') : setInputCurr('USD')
        setInputValue(convertedValue)
    }

    const converter = () => {
        let rate = customInput ? greaterThanThreeshold(fxRate, override) ? fxRate : override : fxRate

        if (inputCurr === 'USD') {
            setConvertedValue((inputValue / rate).toFixed(3))
        }
        else {
            setConvertedValue((inputValue * rate).toFixed(3))
        }
    }
    
    useEffect(() => {
        converter()
    }, [fxRate, inputValue])

    return (
        <Card className='text-center p-3 my-5 mx-auto shadow'>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Fx Rate
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control readOnly disabled={customInput} type='text' value={fxRate} />
                        </Col>
                        <Form.Label column sm="2" style={{'text-align':'right'}}>
                            Override Rate
                        </Form.Label>
                        <Col className="text-start d-flex flex-column justify-content-center" sm="2" >
                            <div>
                                <Form.Check
                                    className="d-inline mx-2"
                                    type="switch"
                                    id="custom-switch"
                                    value={customInput}
                                    onChange={(e) => setCustomInput(!customInput)}
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            {inputCurr}
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        </Col>
                        <Form.Label column sm="2" style={{'text-align':'right'}}>
                            Currency Convert
                        </Form.Label>
                        <Col className="text-start d-flex flex-column justify-content-center" sm="2">
                            <div> 
                                EUR
                                <Form.Check
                                    className="d-inline mx-2"
                                    type="switch"
                                    id="custom-switch"
                                    value={inputCurr}
                                    onChange={(e) => handleCurrencyChange(e.target.value)}
                                />
                                USD
                            </div>
                        </Col>
                    </Form.Group>
                    {customInput && <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Override Rate
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="number" value={override} onChange={(e) => setoverride(e.target.value)} />
                        </Col>
                    </Form.Group>
                    }
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            {inputCurr === 'USD' ? 'EUR' : 'USD'}
                        </Form.Label>

                        <Col sm="6">
                            <Form.Control type="number" disabled value={convertedValue} />
                        </Col>
                    </Form.Group>

                    <Button className="mx-2 btn btn-success" variant="primary" onClick={() => addData({
                        'fxRate': fxRate,
                        'override': override,
                        'inputCurr': inputCurr,
                        'initialAmount': inputValue,
                        'convertedAmount': convertedValue,
                    })}>
                        Save
                    </Button>

                    <Button className="mx-2 btn btn-success" variant="primary" onClick={()=>clearHistory()}>
                        Clear History
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default ConverterCard;