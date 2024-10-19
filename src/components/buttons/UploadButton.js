import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadButton = ({ onUpload }) => {
  const props = {
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        onUpload(data); // Callback para manipular o arquivo após o upload
      };
      reader.readAsText(file);
      return false; // Impede o upload automático
    }
  };

  return (
    <Upload {...props}>
      <Button
        icon={<UploadOutlined />}
        style={{ marginBottom: '16px', marginLeft: '8px' }} // Ajuste do padding
      >
        Upload de Arquivo
      </Button>
    </Upload>
  );
};

export default UploadButton;
