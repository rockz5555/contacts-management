import { Box, useMediaQuery, useTheme } from '@mui/material';

import * as React from 'react';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

	let sxProps;

	if (isSmallScreen) {
		sxProps = {
			p: 3,
			mt: -4,
		};
	} else {
		sxProps = {
			mt: 12,
			ml: -18,
		};
	}

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={sxProps}>{children}</Box>}
		</div>
	);
};

export const a11yProps = (index: number) => ({
	id: `vertical-tab-${index}`,
	'aria-controls': `vertical-tabpanel-${index}`,
});
