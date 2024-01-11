import dotenv from "dotenv"
import { Trykker } from "next/font/google"
import path  from "path"
import payload, { Payload } from "payload"
import type { InitOptions } from "payload/config"
import { cache } from "react"
import nodemailer from "nodemailer"

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

//Define transporter (ALSO VERIFICATION EMAIL ETC)
const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465, 
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY
    }
})

let cached = (global as any).payload

if(!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null,
    }
}

interface Args {
    initOptions?: Partial<InitOptions>
}

export const getpayloadClient = async ({
    initOptions,
}: Args ={}): Promise<Payload>  => {
    if(!process.env.PAYLOAD_SECRET){
        throw new Error('PAYLOAD_SECRET is missing')
    }
    if(cached.client){
        return cached.client
    }
    //Email Details !!!!!!!!!!!
    if(!cached.promise){
        cached.promise = payload.init({
            email: {
                transport: transporter,
                fromAddress: "tife@plotix.io",
                fromName: "Plotix",
            },
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {}),
        })
    }

    try{
        cached.client = await cached.promise
    } catch(e: unknown){
        cached.promise = null
        throw e
    }
    return cached.client
     
}