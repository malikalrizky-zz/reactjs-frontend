import { useContext } from "react"
import { Modal, Image } from "react-bootstrap"
import { UserContext } from "../contexts/userContext"

function ModalTransaction() {
  const [state, dispatch] = useContext(UserContext)
  const handleModalTransaction = () => {
    dispatch({
      type: "TRANSACTIONMODALTUTUP",
    })
  }
  return (
    <>
      <Modal
        size='sm'
        centered
        show={state.isVisibleTransaction}
        onHide={() => handleModalTransaction()}>
        <Image
          style={{ width: "100%", height: "100%" }}
          src={
            "https://onlinecinema21.herokuapp.com/public/uploads/" +
            state.buktiTransfer
          }></Image>
      </Modal>
    </>
  )
}

export default ModalTransaction
