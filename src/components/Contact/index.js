import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    from_email: '',
    from_name: '',
    to_subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const form = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formValues.from_email.trim()) {
      newErrors.from_email = 'Email is required';
    }
    if (!formValues.from_name.trim()) {
      newErrors.from_name = 'Name is required';
    }
    if (!formValues.to_subject.trim()) {
      newErrors.to_subject = 'Subject is required';
    }
    if (!formValues.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with submission
      emailjs.sendForm('service_0guun27', 'template_2gz4pu8', form.current, 'ab1YrSwGV-XHdHwND')
        .then(
          (result) => {
            setOpen(true);
            form.current.reset();
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      // Form is invalid, update the errors state
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            placeholder="Your Email"
            name="from_email"
            value={formValues.from_email}
            onChange={handleInputChange}
          />
          {errors.from_email && <ErrorMessage>{errors.from_email}</ErrorMessage>}
          <ContactInput
            placeholder="Your Name"
            name="from_name"
            value={formValues.from_name}
            onChange={handleInputChange}
          />
          {errors.from_name && <ErrorMessage>{errors.from_name}</ErrorMessage>}
          <ContactInput
            placeholder="Subject"
            name="to_subject"
            value={formValues.to_subject}
            onChange={handleInputChange}
          />
          {errors.to_subject && <ErrorMessage>{errors.to_subject}</ErrorMessage>}
          <ContactInputMessage
            placeholder="Message"
            rows="4"
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
          />
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          <ContactButton type="submit" value="Send" />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Email sent successfully!"
          severity="success"
        />
      </Wrapper>
    </Container>
  );
};

export default Contact;
