import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFirebase } from '../../context/Firebase.context'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductsModal() {

  const {setProduct, fetchDataProducts} = useFirebase()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 1001),
    name: '',
    description: '',
    value: '',
    available: false,
  });

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async () => {
    if (formData.name && formData.description && formData.value !== '') {
      await setProduct(formData).then(async () => {
        await fetchDataProducts();
        setFormData({
          id: Math.floor(Math.random() * 1001),
          name: '',
          description: '',
          value: '',
          available: false,
        });
      });
  
      handleClose();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.')
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>ADD Produto</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Preencha o formulário
          </Typography>
          <form>
            <TextField
              label="Nome do Produto"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descrição"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Valor"
              type="number"
              variant="outlined"
              name="value"
              value={formData.value}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.available} onChange={handleInputChange} name="available" />}
              label="Disponível"
            />
            <br />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
