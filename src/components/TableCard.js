import { Table, Card } from "react-bootstrap";

const TableCard = ({ data }) => {
    return (
        <Card className='text-center p-3 my-5 mx-auto shadow'>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr class="table-active">
                            <th>#</th>
                            <th>Initial Amount</th>
                            <th>Fx Rate</th>
                            <th>Custom Rate</th>
                            <th>Converted Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((value, index) =>
                            <tr key={index} class="table-success">
                                <td>{index+1}</td>
                                <td>{value.initialAmount} {value.inputCurr}</td>
                                <td>{value.fxRate}</td>
                                <td>{value.override}</td>
                                <td>{value.convertedAmount} {value.inputCurr === 'USD' ? 'EUR' : 'USD'}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

export default TableCard;