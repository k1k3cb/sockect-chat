import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../sockets/sockets';
import BubbleChat from '../bubble-chat/BubbleChat';
import {
	StyledBubblesFlex,
	StyledChat,
	StyledChatSpace,
	StyledUseList
} from './styles';

const Chat = () => {
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [userMessage, setUserMessage] = useState([]);

	console.log('connectedUsers', connectedUsers);
	console.log('userMessage', userMessage);

	useEffect(() => {
		socket.on('users', allUsers => {
			setConnectedUsers(allUsers);
		});
		socket.on('not user name', noUsers(navigate));
	}, []);
	useEffect(() => {
		socket.on('message', messages => {
			setUserMessage(messages);
		});
	}, []);

	const navigate = useNavigate();
	return (
		<>
			<StyledChat>
				<StyledUseList>
					{connectedUsers.map(user => (
						<span key={user.id}>{user.username}</span>
					))}
				</StyledUseList>
				<StyledChatSpace>
					<StyledBubblesFlex>
						{userMessage.map(message => (
							<BubbleChat
								user={message.username}
								text={message.userMessage}
								key={message.id}
								color={message.color}
							/>
						))}
					</StyledBubblesFlex>

					<form onSubmit={handleSend}>
						<input type='text' name='message' />
						<button>Enviar</button>
					</form>
				</StyledChatSpace>
			</StyledChat>
		</>
	);
};

const handleSend = event => {
	event.preventDefault();
	const message = event.target.message.value;
	socket.emit('message', message);
	event.target.message.value = '';
};

const noUsers = navigate => {
	navigate('/');
};

export default Chat;
