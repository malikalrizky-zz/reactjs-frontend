import { useState, useEffect, useContext } from "react"
import {
  Table,
  Row,
  Col,
  NavDropdown,
  Container,
  DropdownButton,
  Image,
} from "react-bootstrap"
import { UserContext } from "../../contexts/userContext"
import { API } from "../../config/api"

function Admin() {
  const [, dispatch] = useContext(UserContext)
  const [listTransaction, setListTransaction] = useState([])
  const [approve] = useState("Finished")
  const [cancel] = useState("Cancel")
  const [filter, setFilter] = useState("")

  const sortTransaction = async () => {
    try {
      const response = await API.get("/sort-transaction")
      setListTransaction(response.data.data)
      setFilter("sort")
    } catch (error) {
      console.log(error)
    }
  }

  const loadTransaction = async () => {
    try {
      const response = await API.get(`/transaction`)
      setListTransaction(response.data.data.transaction)
    } catch (error) {
      console.log(error)
    }
  }

  const postCancel = async (item) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const body = JSON.stringify({
        status: cancel,
      })
      await API.patch(`updateTransactionStatus/${item}`, body, config)
    } catch (error) {
      console.log(error)
    } finally {
      loadTransaction()
    }
  }

  const postApproved = async (item) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const body = JSON.stringify({
        status: approve,
      })

      await API.patch(`updateTransactionStatus/${item}`, body, config)
    } catch (error) {
      console.log(error)
    } finally {
      loadTransaction()
    }
  }

  const handleModalTransaction = (item) => {
    dispatch({
      type: "TRANSACTIONMODALBUKA",
      payload: item,
    })
  }

  useEffect(() => {
    loadTransaction()
  }, [])

  return (
    <Container style={{ maxWidth: "74rem", marginBottom: "10rem" }}>
      <h1 className='white mb-5'>Incoming Transaction</h1>
      <button className='btn btn-primary mb-3' onClick={sortTransaction}>
        Sort
      </button>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr style={{ color: "red" }}>
            <th className='px-3'>No</th>
            <th>Users</th>
            <th>Bukti Transfer</th>
            <th>Film</th>
            <th>Number Account</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {listTransaction?.map((item, index = 1) => {
            return (
              <tr className='py-4' key={index}>
                <td className='px-3'>{index + 1}</td>
                <td>{item.User.fullName}</td>
                <td>
                  <href
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleModalTransaction(item.transferProof)
                    }}>
                    {item.transferProof}
                  </href>
                </td>
                <td>{item.Film.title}</td>
                <td>{item.accountNumber}</td>
                <td
                  className={
                    item.status === "Finished"
                      ? "finished"
                      : item.status === "Pending"
                      ? "pending"
                      : "cancel"
                  }>
                  {item.status}
                </td>
                <td>
                  <DropdownButton
                    menuAlign='right'
                    title={
                      <div>
                        <Image src='/Polygon 2.png' />
                      </div>
                    }>
                    <div className='container'>
                      <div className='row triangle-container'>
                        <div className='col triangle-container'></div>
                        <div className='col-2 triangle-small '></div>
                      </div>
                    </div>
                    <div className='dropdown-item-container py-2'>
                      <NavDropdown.Item
                        onClick={() => {
                          postApproved(item.id)
                        }}>
                        <Row>
                          <Col
                            className='d-flex justify-content-center finished'
                            xs
                            style={{
                              fontSize: "1rem",
                            }}>
                            Approved
                          </Col>
                        </Row>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => postCancel(item.id)}>
                        <Row>
                          <Col
                            className='d-flex justify-content-center cancel'
                            style={{
                              fontSize: "1rem",
                            }}>
                            Cancel
                          </Col>
                        </Row>
                      </NavDropdown.Item>
                    </div>
                  </DropdownButton>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default Admin
