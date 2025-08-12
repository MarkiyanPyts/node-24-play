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

const getHumanReadableTimeInterval = (startDate: Date, endDate: Date) => {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffInDays / 365);
    const months = Math.floor((diffInDays % 365) / 30);
    const days = diffInDays % 30;

    return `${years} years, ${months} months, and ${days} days`;
}


const calculateDateDifferenceTool = tool({
    name: "CalculateDateDifference",
    description: "Use this tool to calculate Date difference if asked questions like 'how much time napoleonic wars lasted?'.",
    parameters: z.object({
        startDate: z.string().transform((dateString) => new Date(dateString)),
        endDate: z.string().transform((dateString) => new Date(dateString))
    }),
    async execute({startDate, endDate}) {
        console.log(`Calculating date difference between ${startDate} and ${endDate}`);
        return `The difference is ${getHumanReadableTimeInterval(startDate, endDate)} Date`
    }
})

const stringDateToDate = (dateString: string): Date => {
    const date = new Date(dateString);
    console.log(`Converting string "${dateString}" to date: ${date}`);
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
    }
    return date;
}

const stringDateToDateTool = tool({
    name: "StringToDate",
    description: "Convert a string to a Date object",
    parameters: z.object({
        dateString: z.string()
    }),
    async execute({dateString}) {
        try {
            const date = stringDateToDate(dateString);
            return `The date is ${date.toLocaleDateString()}`;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }
});

const historyTutor = new Agent({
    name: 'History Tutor',
    instructions: `You provide answers on historical queries, present yourself as history expert. Current date is ${new Date().toLocaleDateString()}. When asked about date difference use CalculateDateDifference it accepts 2 dates as arguments, to set this arguments correctly use StringToDate tool.`,
    tools: [getWeaterTool, stringDateToDateTool, calculateDateDifferenceTool]
})

export { run, historyTutor, calculateDateDifferenceTool }