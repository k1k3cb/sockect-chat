import styled from 'styled-components';

export const StyledBubble = styled.div`
	padding: 8px 12px;
	border-radius: 8px;
	margin-block: 5px;
	display: inline-block;
	width: fit-content;
	background-color: ${({ $color }) => $color};
	color: white;
`;
