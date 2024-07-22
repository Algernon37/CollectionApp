import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../firebaseConfig';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import style from './style/Entry.module.sass';
import { useNavigate } from 'react-router-dom';

function Entry({ authFunction, nameButton }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEntry = (e) => {
    e.preventDefault();
    const operation = authFunction === 'signIn' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
    operation(auth, email, password)
      .then((userCredential) => {
        if (authFunction === 'signUp' && displayName) {
          updateProfile(userCredential.user, {
            displayName: displayName
          }).then(() => {
            console.log('Display name set to:', displayName);
          }).catch((error) => {
            console.error('Error updating display name:', error);
          });
        }
        navigate('/UsersCollections');
      })
      .catch((error) => {
        let errorMessage;
        if (error.code === 'auth/invalid-credential') {
          errorMessage = "Не правильная почта или пароль";
        } else if (error.code === 'auth/email-already-in-use') {
          errorMessage = "Email уже используется";
        } else {
          errorMessage = authFunction === 'signIn' ? `Ошибка входа: ${error.message}` : `Ошибка регистрации: ${error.message}`
        }
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <Form onSubmit={handleEntry} className={style.container}>
        <Form.Group controlId="formBasicEmail" className={style.control}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className={style.control}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {nameButton}
        </Button>
      </Form>
    </div>
  );
}

export default Entry;