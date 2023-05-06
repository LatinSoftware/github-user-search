import { IconButton, styled } from '@mui/material';


type Props = {
    children: string | JSX.Element | JSX.Element[] | undefined,
    color?: string
}

const CircleButtonIcon = ({ children, color }: Props) => {

    const CustomButton = styled(IconButton)({
        width: '4rem',
        height: '4rem',
        color: 'var(--primary)',
        boxShadow: '0 0 8px 0 rgba(50, 50, 50, 0.15);',
        transition: '250ms',
        fontSize: '2.8rem',
        backgroundColor: 'white',
        '&:hover': {
            color: color ?? 'var(--primary)',
            boxShadow: `0 0 24px 0 ${color ?? 'var(--primary)'}`
        }

    });

    return (
        <CustomButton type='button' >
            {children}
        </CustomButton>
    );
}

export { CircleButtonIcon };