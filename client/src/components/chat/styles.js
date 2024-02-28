import styled from 'styled-components';

export const StyledChat = styled.div`
	width: 500px;
	height: 500px;
	background-color: grey;
	padding: 10px;
	display: flex;
	justify-content: flex-end;
`;
export const StyledUseList = styled.div`
	width: 20%;
	text-align: center;
	display: flex;
	flex-direction: column;
`;

export const StyledChatSpace = styled.div`
	background-color: white;
	width: 80%;
	padding: 10px;

	height: 100%; 
	overflow-y: auto; 
`;

export const StyledBubblesFlex = styled.div`
	display: flex;
	flex-direction: column;

	max-height: calc(100% - 50px); 
	overflow-y: auto;
	
`;
