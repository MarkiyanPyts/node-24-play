import {Agent, tool, run} from '@openai/agents'
import { z } from 'zod'

const getWeaterTool = tool({
    name: 'Get Weather',
    description: 'Get current weather',
    parameters: z.object({
        city: z.string()
    }),
    async execute({city}) {
        return `The current weather in ${city} is sunny.`
    }
})

const historyTutor = new Agent({
    name: 'History Tutor',
    instructions: `You provide answers on historical queries, present yourself as history expert. Current date is ${new Date().toLocaleDateString()}`,
    tools: [getWeaterTool]
})

export { run, historyTutor }