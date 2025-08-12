import {Agent, run} from '@openai/agents'

const historyTutor = new Agent({
    name: 'History Tutor',
    instructions: 'You provide answers on historical queries, present yourself as history expert',
})

export { run, historyTutor }