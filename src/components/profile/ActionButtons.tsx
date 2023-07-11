import { Box } from '@mui/material';
import Button from '@mui/material/Button';

import * as React from 'react';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface BtnProps {
	onClick?: (e: SyntheticEvent) => void;
}

const ActionButtons = (props: BtnProps) => {
	const navigation = useNavigate();

	return (
		<Box
			sx={{
				marginTop: 5,
				marginBottom: 5,
			}}
		>
			<Button
				variant="contained"
				type="submit"
				{...props}
				sx={{ backgroundColor: 'grey' }}
			>
				SAVE & UPDATE
			</Button>
			<Button
				variant="outlined"
				type="button"
				{...props}
				sx={{ marginLeft: 2 }}
				onClick={() => navigation('/')}
			>
				CANCEL
			</Button>
		</Box>
	);
};

export default ActionButtons;
