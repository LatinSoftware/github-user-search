import { assign, createMachine } from "xstate";


type contextType = {
    value: string
}

type events =
    | { type: 'SET_YELLOW', value: string }
    | { type: 'SET_RED', value: string }
    | { type: 'SET_GREEN', value: string }

type states =
    | { value: 'green', context: contextType }
    | { value: 'red', context: contextType }
    | { value: 'yellow', context: contextType }

const testMachine = createMachine<contextType, events, states>({
    id: 'testMachine',
    initial: 'green',
    states: {
        green: {
            always: {
                target: 'yellow',
                actions: assign({ value: 'yellow' })
            }
            // on: {
            //     SET_YELLOW: {
            //         target: 'yellow',
            //         actions: assign({ value: 'yellow' })
            //     }
            // },
            
        },
        red: {
            on: {
                SET_GREEN: {
                    target: 'green',
                    actions: assign({ value: 'green' })
                }
            }
        },
        yellow: {
            on: {
                SET_RED: {
                    target: 'red',
                    actions: assign({ value: 'red' })
                }
            }
        }
    }
})

export { testMachine }