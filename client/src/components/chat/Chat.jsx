import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../sockets/sockets';
import BubbleChat from '../bubble-chat/BubbleChat';
import {
	StyledBubblesFlex,
	StyledChat,
	StyledChatSpace,
	StyledForm,
	StyledUseList
} from './styles';

const Chat = () => {
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [messages, setMessages] = useState([]);

	console.log('connectedUsers', connectedUsers);
	console.log('userMessage', messages);

	useEffect(() => {
		socket.on('users', allUsers => {
			setConnectedUsers(allUsers);
		});
		socket.on('not user name', () => noUsers(navigate));
	}, []);

	useEffect(() => {
		socket.on('message', message => {
			setMessages(prevMessages => [...prevMessages, message]);
		});
	}, []);

	const navigate = useNavigate();
	console.log('userMessages', messages);

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
						{messages.map(message => (
							<BubbleChat
								user={message.username}
								text={message.userMessage}
								key={message.id}
								color={message.color}
								currentUser={message.senderId === socket.id}
							/>
						))}
					</StyledBubblesFlex>

					<StyledForm onSubmit={handleSend}>
						<input type='text' name='message' />
						<button>Enviar</button>
					</StyledForm>
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
