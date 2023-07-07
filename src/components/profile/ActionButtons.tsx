import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import { SyntheticEvent } from 'react';

interface BtnProps {
	onClick?: (e: SyntheticEvent) => void;
	type?: 'submit' | 'reset' | 'button';
}

const ActionButtons = (props: BtnProps) => {
	return (
		<Box
			sx={{
				marginTop: 5,
				marginBottom: 5,
			}}
		>
			<Button variant="contained" {...props} sx={{ backgroundColor: 'grey' }}>
				SAVE & UPDATE
			</Button>
			<Button variant="outlined" {...props} sx={{ marginLeft: 2 }}>
				CANCEL
			</Button>
		</Box>
	);
};

export default ActionButtons;
