import React from "react";
import { EmojiProps } from "../Types";

const Emoji: React.FC<EmojiProps> = ({ label, emoji }): JSX.Element => {
	return (
		<span role='img' aria-label={label}>
			{emoji}
		</span>
	);
};

export default Emoji;
