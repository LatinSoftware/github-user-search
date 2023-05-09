import { IconButton, Tooltip, styled } from '@mui/material';


type Props = {
    children: string | JSX.Element | JSX.Element[] | undefined,
    color?: string,
    href?: string,
    description?: string
    disabled?: boolean

}

const CircleButtonIcon = ({ children, color, disabled, href, description }: Props) => {

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

    const redirectUser = () => {
        if (!href) return;

        window.open(
            href,
            '_blank'
        )


    }

    return (
        <Tooltip title = {description} arrow>
            <span>
                <CustomButton type='button' disabled={disabled} onClick={redirectUser} >
                    {children}
                </CustomButton>
            </span>
        </Tooltip>
    );
}

export { CircleButtonIcon };