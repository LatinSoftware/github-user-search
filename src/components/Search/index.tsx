import { IconButton, InputBase, styled, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import './index.css'
import React, { SetStateAction } from "react";

const SearchInput = (styled(InputBase))({
    width: '90%',
    borderRadius: '15px 0 0 15px',
    backgroundColor: 'white',
    paddingLeft: '.6rem',
    boxShadow: '0 0 8px 0 rgba(50, 50, 50, 0.15);',
})

const CustomButton = styled(IconButton)({
    position: 'absolute',
    right: '5%',
    width: '1.8rem',
    height: '1.8rem',
    color: 'var(--primary)',
    fontSize: '1rem',
    backgroundColor: 'white',
    boxShadow: '0 0 8px 0 rgba(50, 50, 50, 0.15);',
    transition: '250ms',
    '&:hover': {
        backgroundColor: 'white'
    }
});


const Search = ({ value, setValue, onClick }: {
    value: string,
    setValue: React.Dispatch<SetStateAction<string>>
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {

    const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value)
    }

    return (
        <Stack
            position='relative'
            direction='row'
            alignContent='center'
            alignItems='center'>
            <SearchInput placeholder="Search..." value={value} onChange={handleOnInputChange} />
            <div className="circle" />
            <CustomButton onClick={onClick} >
                <SearchIcon fontSize="inherit" />
            </CustomButton>
        </Stack>
    );
}

export { Search };
