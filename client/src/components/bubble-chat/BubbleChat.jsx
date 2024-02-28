import { StyledBubble } from './styles';

const BubbleChat = ({ user, text, color }) => {
	return (
		<StyledBubble $color={color}>
			<h5>{user}</h5>
			<p>{text}</p>
		</StyledBubble>
	);
};

export default BubbleChat;
