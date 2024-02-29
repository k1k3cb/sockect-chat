import { StyledBubble, StyledBubbleContainer } from './styles';

const BubbleChat = ({ user, text, color, currentUser }) => {
	return (
		<StyledBubbleContainer $currentUser={currentUser}>
			<StyledBubble $color={color}>
				<h5>{user}</h5>
				<p>{text}</p>
			</StyledBubble>
		</StyledBubbleContainer>
	);
};

export default BubbleChat;
