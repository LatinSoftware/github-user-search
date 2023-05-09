import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

import { GitHubUserType } from "../../types";

const Detail = ({user}: {user: GitHubUserType | undefined}) => {
    return (
        <Fragment>
            <Stack>
                <Typography variant="h4" >{user?.name}</Typography>
                <Typography variant="caption">@{user?.login}</Typography>
                <Typography variant="body2" > {user?.bio ?? ' Lorem ipsum dolor sit amet eu labore ipsum gubergren clita rebum dolor lorem et eos ea amet nonummy commodo ut euismod invidunt kasd duo ipsum augue gubergren nonumy ea enim autem magna duo clita et dolore elitr nonumy amet nisl justo diam eos amet dolor duis sit odio augue invidunt'}</Typography>
            </Stack>
        </Fragment>
    );
}

export { Detail };