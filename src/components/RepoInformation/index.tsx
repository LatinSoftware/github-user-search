import { Stack, Typography } from "@mui/material";
import CountUp from "react-countup";

type numberString = {
    number: number,
    string: string
}

const RepoInformation = (props: { name: string, qty: number }) => {

    const numberFormat = RefactorNumber(props.qty)

    return (
        <Stack alignItems='center' spacing={0} >
            <Typography variant="h3">
                <CountUp duration={5} className="counter" end={numberFormat.number} /> 
                {numberFormat.string}
            </Typography>
            <Typography variant="subtitle2" >{props.name}</Typography>
        </Stack>
    );
}


function RefactorNumber(number: number): numberString {

    const data = {
        number: number,
        string: ''
    } as numberString;

    if (number >= 1000) {
        data.number = number / 1000;
        data.string = 'K'
    }
    else if (number >= 100000) {
        data.number = number / 100000;
        data.string = "M"
    }

    return data;
}

export { RepoInformation };