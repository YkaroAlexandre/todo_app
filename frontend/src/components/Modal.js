import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

export default function ModalComponent({ show, onHide, onSubmit }) {

    return (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Criação de tarefa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Titulo da tarefa" />
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control name="description" as="textarea" placeholder="Descrição da tarefa" />
                </Form.Group>
                <Button type='submit' variant="primary">
                Salvar Tarefa
                </Button>
            </Form>
        </Modal.Body>
        
    </Modal>
    );
}

