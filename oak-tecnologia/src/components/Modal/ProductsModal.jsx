import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox'; // Importe o Checkbox
import FormControlLabel from '@mui/material/FormControlLabel'; // Importe o FormControlLabel
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

  // Estados para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 1001),
    name: '',
    description: '',
    value: '',
    available: false, // Inicialize como false
  });

  // Função para lidar com a alteração nos campos do formulário
  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value; // Se for um checkbox, pegue o valor de 'checked', senão, use 'value'
    setFormData({ ...formData, [name]: newValue });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (formData.name && formData.description && formData.value !== '') {
      // Aqui você pode realizar a lógica necessária com os dados do formulário
      await setProduct(formData).then(async () => {
        await fetchDataProducts();
        setFormData({
          id: Math.floor(Math.random() * 1001),
          name: '',
          description: '',
          value: '',
          available: false, // Reinicialize como false
        });
      });
  
      // Fechar o modal após o envio do formulário
      handleClose();
    } else {
      // Se algum campo obrigatório estiver vazio, exiba uma mensagem ou realize outra ação
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
          {/* Formulário */}
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
            {/* Utilize o Checkbox */}
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
