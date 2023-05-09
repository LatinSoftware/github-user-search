import { assign, createMachine } from "xstate";
import { GitHubUserType } from "../types";
import { getUser } from "../services/UserService";



type contextType = {
    user?: GitHubUserType,
    searchValue: string
}

type events =
    | { type: 'FILL', searchValue: string }

type states =
    | { value: 'initial', context: contextType & { user: undefined, searchValue: undefined } }
    | { value: 'loading', context: contextType }
    | { value: 'sucess', context: contextType & { user: GitHubUserType, searchValue: undefined } }
    | { value: 'error', context: contextType & { user: undefined, searchValue: undefined } }
    | { value: 'filling', context: contextType & { user: undefined, searchValue: string } }


const searchValid = (context: contextType) => {
    const isValid = context.searchValue !== '';
    return isValid;
};


const fetchUser = async (value: string): Promise<GitHubUserType> => {
    let data = {} as GitHubUserType

    if (value == 'octocat') {
        // verificar si existe en local storage
        const lc = localStorage.getItem('octocat');
        if (lc) {
            data = JSON.parse(lc) as GitHubUserType;
        } else {
            data = await getUser('octocat');
            localStorage.setItem('octocat', JSON.stringify(data))
        }
    } else
        data = await getUser(value);

    return data;
}

const setInputValue = assign((context, event: events) => {
    return {
        searchValue: event.searchValue
    }
});


const GitHubUserMachine = createMachine<contextType, events, states>({
    /** @xstate-layout N4IgpgJg5mDOIC5QHECWAXAFgVwEYFkBDAY01QDswA6CjVQgGwGIBtABgF1FQAHAe1h0+5biAAeiAIwA2SVQAsAdgCckxYoDM8gExt5+gDQgAnog3TFVAKyT5yjbatXtADmnaAvh6NoseIqQU1Ax8hBAUUEwQwtQUAG58ANbUMOi+OLgAqrBgAE7sXEgg-ILoqMKiEgjyGlbWFora8i6qysqKMkamCOaWGtr2LS7qzdrSXj4YGQFklFQhYRFMebl8uVQ8DIToAGZrALZUqel42XkFoiVCIkVVNXVWDU0tkm0d0l2IY-JUGpoW2kUsm0MkkExAJwIJFm1Fg2GIcFgTAAYgBJAAy6IuRSuZQqtykemUVDYymk8kkII01Ok0hcnx60jqLm0Vma5g0ykBww04MhMyCVBWaxRGKxnEuAmulUJdhJZIpVJpdIZY20VDc7Vpzg0bEp2l53ghU380MFO1QDAYS2xvCleJuoCqkiJ8vJlMk1PMKpMUnkdRqijsBp0lPk43B5D4EDgon5ZsoktK5Ud4kQAFoPr6EJmSWx8wXC-nXHyTVDAnNaGVGEnpQTqtoGd6FO1lC4bOSBi5bKW-OWYfNQuFyFBaw6ZQhWdJrPpXGytHq2IomzUSbYWvY2+pnPJe9ME7D4YixymJ9JavV1FoVNI2LpJE3aRrFC52+edG3DZM+wK5sLcie+JOogtLEgaupti4diPD63RjBoVBcg4jQsmoKieEa8YVtQFpWhEgGps6rzEsobB-K857DDoWZwU+OgOJy2hjO8jxeF4QA */
    id: "GithubMachine",
    description: "Máquina de estado para manejar los estados de las búsquedas de usuarios en git",
    initial: "initial",
    states: {
        initial: {
            always: {
                target: "loading",
            },
        },
        loading: {
            invoke: {
                src: (context) => fetchUser(context.searchValue),
                id: "getGithubUser",
                onDone: [
                    {
                        target: "sucess",
                        actions: assign((context, event) => {
                            return {
                                user: event.data,
                            }
                        })
                    },
                ],
                onError: [
                    {
                        target: "error",
                    },
                ],
            },
        },
        sucess: {
            description: "En este estado se mostrara los datos del usuario en pantalla",
            on: {
                FILL: {
                    target: "filling",
                    actions: [
                        setInputValue,
                    ]
                },

            },
        },
        error: {
            description: "En este estado se mostrara un mensaje de error.",
            on: {
                FILL: {
                    target: "filling",
                    actions: [
                        setInputValue,
                    ]
                },
            },
        },
        filling: {
            description: "llenar el valor a buscar",
            always: {
                target: "initial",
                cond: "searchValid",
            },
        },
    },
    context: {
        user: undefined,
        searchValue: 'octocat'
    },
    "predictableActionArguments": true,
    "preserveActionOrder": true
}, {
    guards: {
        searchValid
    }
},
);


export { GitHubUserMachine }