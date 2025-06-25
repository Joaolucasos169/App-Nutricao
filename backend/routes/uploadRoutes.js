const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.files || !req.files.foto) {
      return res.status(400).json({ error: 'Nenhuma foto enviada' });
    }

    const foto = req.files.foto;
    const uploadDir = path.join(__dirname, '../uploads');

    // Cria pasta uploads se não existir
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const nomeArquivo = `${Date.now()}_${foto.name}`;
    const uploadPath = path.join(uploadDir, nomeArquivo);

    await foto.mv(uploadPath);

    const baseUrl = process.env.BASE_URL || `http://172.26.28.58:${process.env.PORT || 3000}`;
    const url = `${baseUrl}/uploads/${nomeArquivo}`;

    res.status(200).json({ url });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro no upload da foto' });
  }
});

module.exports = router;
