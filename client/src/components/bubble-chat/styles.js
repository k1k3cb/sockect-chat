import styled from 'styled-components';

const StyledBubbleContainer = styled.div`
	display: flex;
	justify-content: ${({ $currentUser }) =>
		$currentUser ? 'flex-end' : 'flex-start'};
`;

const StyledBubble = styled.div`
	padding: 8px 12px;
	border-radius: 8px;
	margin-block: 5px;
	display: inline-block;
	width: fit-content;
	background-color: ${({ $color }) => $color};
	color: white;
`;

export { StyledBubble, StyledBubbleContainer };
