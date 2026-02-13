import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

export default function ModalComponent({ show, onHide, onSubmit }) {

    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={onSubmit}>

            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={onHide}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
}