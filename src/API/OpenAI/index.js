import OpenAI from "openai";
import { useContext } from "react";

const key = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true})

const generateImage = async (state, setState) => {
    const prompt = `please create a very simple image of a dog. this is a test.`

    try {
        // const completion = await openai
    }
}