import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoimg from '../../assets/logo.svg';
import petimg from '../../assets/pet.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        
        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('pessoaId', id);
            localStorage.setItem('pessoaName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="Logon-container">
            <section className="form">
                <img src={logoimg} alt="Adote um Pet" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <p>b3c2971d</p>

                    <input
                        type="text"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#6e0bdf" />
                        Não Tenho Cadastro
                    </Link>
                </form>
            </section>

            <img src={petimg} alt="Adote um pet" />
        </div>
    );
}