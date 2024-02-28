import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../sockets/sockets';

const Home = () => {
	const navigate = useNavigate();
	const [btnDisabled, setBtnDisabled] = useState(true);
	return (
		<>
			<form onSubmit={event => handleLogin(event, navigate)}>
				<input
					type='text'
					name='username'
					onChange={event => handleChangeButton(event, setBtnDisabled)}
				/>
				<button disabled={btnDisabled}>LOGIN</button>
			</form>
		</>
	);
};

const handleLogin = (event, navigate) => {
	event.preventDefault();
	const username = event.target.username.value;
	socket.emit('login', username);
	navigate('/chat');
};

const handleChangeButton = (event, setBtnDisabled) => {
	const message = event.target.value.trim();
	console.log('message', message);
	setBtnDisabled(message === '');
};

export default Home;
